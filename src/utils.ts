namespace Utils {
  type MapObjectOut<T, TOut> = { [K in keyof T]: TOut };

  export function mapObject<T, TOut>(
    obj: T,
    map: <K extends keyof T>(value: T[K], key: K) => TOut
  ): MapObjectOut<T, TOut> {
    const ret = {} as MapObjectOut<T, TOut>;
    for (const key in obj) {
      const value = obj[key];
      ret[key] = map(value, key);
    }
    return ret;
  }

  export const objToMap = <T, V extends keyof T>(obj: T): Map<V, T[V]> =>
    new Map<V, T[V]>(Object.entries(obj) as Iterable<readonly [V, T[V]]>);

  export const MapToObj = <T extends { [key: string]: any }, V extends keyof T>(
    map: Map<V, T[V]>
  ) => Object.fromEntries(map) as T;

  export const deepCopy = <T extends { [key: string]: any }>(obj: T): T => {
    if (obj === null || typeof obj !== "object" || typeof obj === "function") {
      return obj;
    }

    // Crear un nuevo objeto y copiar las propiedades
    const copiedObject: T = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        copiedObject[key] = deepCopy(value);
      }
    }

    return copiedObject;
  };

  export const deepEqual = <
    T extends { [key: string]: any },
    U extends { [key: string]: any },
  >(
    obj1: T,
    obj2: U
  ) => {
    if (obj1 === (obj2 as unknown as T)) return true;

    if (
      typeof obj1 !== "object" ||
      typeof obj2 !== "object" ||
      typeof obj1 === null ||
      typeof obj2 === null
    )
      return false;

    const obj1_keys = Object.keys(obj1);
    const obj2_keys = Object.keys(obj2);

    if (obj1_keys.length !== obj2_keys.length) return false;

    for (const k of obj1_keys) {
      if (!deepEqual(obj1[k], obj2[k])) return false;
    }

    return true;
  };

  export const isEmptyObject = <T extends { [key: string]: any }>(
    obj: T
  ): boolean => {
    if (!obj || typeof obj !== "object") return false;
    return JSON.stringify(obj) === "{}";
  };
}

export default Utils;
