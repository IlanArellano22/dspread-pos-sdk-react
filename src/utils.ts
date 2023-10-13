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
}

export default Utils;