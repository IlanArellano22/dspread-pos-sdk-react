import Utils from "../../utils";

type QPOSPromiseTag = "getQposId" | "requestSetAmount";

export interface QPOSStack {
  /**Thats the internal id for this queue stack */
  stackId: number;
  /**Its the type of stack that work as identifier to different process */
  tag: QPOSPromiseTag;
}

enum RemoveResult {
  SINGLE,
  MULTIPLE,
  ALL,
}

type SingleElement<T extends any[]> = T extends (infer U)[] ? U : never;

export interface StackEnviroment<T extends { [key: string]: any }[]> {
  get: (predicate?: (el: SingleElement<T>) => boolean) => T;
  set: (newValue: Omit<SingleElement<T>, "stackId">) => void;
  remove: (predicate?: (el: SingleElement<T>) => boolean) => void;
}

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

type StackProps<T extends any[]> = SingleElement<T> & QPOSStack;

const finishStackQueuePromise = <T extends any[]>(
  stack: StackEnviroment<T>,
  target: "resolve" | "reject",
  result: any,
  tag?: QPOSPromiseTag
) => {
  const predicate = tag && ((it) => it.tag === tag);
  const el = stack.get(predicate);
  el.forEach((el) => el[target]?.(result));
  stack.remove(predicate);
};

export const resolveStackQueue = <T extends any[]>(
  stack: StackEnviroment<T>,
  result: any,
  tag?: QPOSPromiseTag
) => {
  finishStackQueuePromise(stack, "resolve", result, tag);
};

export const rejectStackQueue = <T extends any[]>(
  stack: StackEnviroment<T>,
  result: any,
  tag?: QPOSPromiseTag
) => {
  finishStackQueuePromise(stack, "reject", result, tag);
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
  };
};
