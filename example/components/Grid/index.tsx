import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { View, StyleSheet } from "react-native";
import ArrayUtils from "../../utils/array";

namespace Grid {
  const styles = StyleSheet.create({
    app: {
      flex: 4, // the number of columns you want to devide the screen into
      marginHorizontal: "auto",
      width: 400,
      backgroundColor: "red",
    },
    row: {
      flexDirection: "row",
      flex: 1,
    },
    "1col": {
      flex: 1,
    },
    "2col": {
      flex: 2,
    },
    "3col": {
      flex: 3,
    },
    "4col": {
      flex: 4,
    },
  });

  interface ColProps extends PropsWithChildren {
    numRows: number;
  }

  export const Col = ({ numRows, children }: ColProps) => {
    return (
      <View style={styles[`${numRows}col` as keyof typeof styles]}>
        {children}
      </View>
    );
  };

  export const Row = ({ children }: PropsWithChildren) => (
    <View style={styles.row}>{children}</View>
  );
}

export default Grid;
