import React from "react";
import { StyleSheet, View } from "react-native";
import ModalBase, { ModalBaseProps } from "../Manager/modalBase";

interface ModalListProps extends ModalBaseProps {}

export default function ModalList({ children, ...restProps }: ModalListProps) {
  return (
    <ModalBase {...restProps}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </ModalBase>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
