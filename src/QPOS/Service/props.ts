import { SingleElement, StackEnviroment } from "../../types/utils";
import Utils from "../../utils";
import {
  QPOSListenerTag,
  QPOSPromiseTag,
  QPOSStack,
  RemoveResult,
} from "../types";

const setPropByStack = <T extends Map<any, any>[]>(
  props: T,
  stackId: number,
  value: Omit<T extends Map<any, infer IValue>[] ? IValue : never, "stackId">
) => {
  const findByStackId = props.findIndex(
    (prop) => prop.get("stackId") === stackId
  );
  if (findByStackId === -1) {
    props.push(
      Utils.objToMap({
        stackId,
        ...value,
      })
    );
    return;
  }
  for (const key in props[findByStackId]) {
    props[findByStackId].set(key, value[key]);
  }
};

const removeProp = <T extends Map<any, any>[]>(
  props: T,
  stackId: number,
  predicate?: (el: Map<any, any>) => boolean
): RemoveResult => {
  props = props.filter((el) => el.get("stackId") !== stackId) as T;
  if (predicate) {
    props = props.filter(predicate) as T;
    return RemoveResult.MULTIPLE;
  }
  return props.length === 0 ? RemoveResult.ALL : RemoveResult.SINGLE;
};

const ObjPredicateToMapPredicate = <T extends { [key: string]: any }[]>(
  predicate?: (el: StackProps<T>) => boolean
) => {
  if (!predicate) return;
  return <K extends keyof StackProps<T>>(el: Map<K, SingleElement<T>[K]>) => {
    return (
      (predicate && predicate(Utils.MapToObj(el) as StackProps<T>)) ?? false
    );
  };
};

type StackProps<T extends any[]> = SingleElement<T> & QPOSStack<any>;

export const finishStackQueue = <T extends any[]>(
  stack: StackEnviroment<T>,
  execute: (el: SingleElement<T>) => any,
  tag?: QPOSPromiseTag | QPOSListenerTag
) => {
  const predicate = tag && ((it: SingleElement<T>) => it.tag === tag);
  const el = stack.get(predicate);
  if (el) el.forEach(execute);
  stack.remove(predicate);
};

export const resolveStackQueue = <T extends any[]>(
  stack: StackEnviroment<T>,
  result: any,
  tag?: QPOSPromiseTag
) => {
  finishStackQueue(stack, (el) => el.resolve(result), tag);
};

export const rejectStackQueue = <T extends any[]>(
  stack: StackEnviroment<T>,
  result: any,
  tag?: QPOSPromiseTag
) => {
  finishStackQueue(stack, (el) => el.reject(result), tag);
};

export const createStackEnviroment = <T extends { [key: string]: any }[]>(
  initial: StackProps<T>[]
): StackEnviroment<StackProps<T>[]> => {
  let stackId = 0;
  let internalValue = initial.map((x) => Utils.objToMap(x));

  const valuesToObj = () => internalValue.map((x) => Utils.MapToObj(x));

  return {
    get: (predicate) => {
      const values = valuesToObj();
      return predicate && predicate instanceof Function
        ? values.filter(predicate)
        : values;
    },
    set: (newValue) => {
      /* @ts-ignore */
      setPropByStack(internalValue, stackId, newValue);
      stackId++;
    },
    remove: (predicate) => {
      const mapPredicate = ObjPredicateToMapPredicate(predicate);
      removeProp(internalValue, stackId, mapPredicate);
    },
    hasAny: (predicate) => {
      const mapPredicate = ObjPredicateToMapPredicate(predicate);
      return mapPredicate
        ? internalValue.some(mapPredicate)
        : internalValue.length > 0;
    },
  };
};
