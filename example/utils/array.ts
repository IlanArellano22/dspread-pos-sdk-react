namespace ArrayUtils {
  export const toSubArray = <IArray extends any[]>(
    array: IArray,
    length: number
  ) => {
    let subArray = [];
    for (let i = 0; i < array.length; i += length) {
      let subarreglo = array.slice(i, i + length);
      subArray.push(subarreglo);
    }
    return subArray;
  };
}

export default ArrayUtils;
