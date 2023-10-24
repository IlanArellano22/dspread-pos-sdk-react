import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackScreenProps } from "../../navigation/types";

export default function ResultScreen({
  route,
  navigation,
}: RootStackScreenProps<"Result">) {
  const { transactionResult } = route.params;

  return (
    <View>
      <Text>Transaction Result</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 20,
  },
  terminalAnimation: {
    width: 200,
    height: 200,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  cancelButton: {
    width: "85%",
    paddingVertical: 20,
    backgroundColor: "#FF6E6E",
    borderRadius: 10,
  },
  cancelButtonText: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
