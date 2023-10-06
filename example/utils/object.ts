namespace ObjectUtils {
  export const isEmptyObject = (obj: any) => {
    if (typeof obj !== "object") return false;
    for (let prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === "{}";
  };

  export const pick = <T extends { [key: string]: any }, K extends keyof T>(
    obj: T,
    ...keys: K[]
  ): Pick<T, K> =>
    keys.reduce(
      (acc, key) => {
        if (obj && obj.hasOwnProperty(key)) {
          acc[key] = obj[key];
        }
        return acc;
      },
      {} as Pick<T, K>
    );
}

export default ObjectUtils;
