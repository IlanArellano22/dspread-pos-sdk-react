import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Grid from "../../components/Grid";
import modalManager from "../../components/Manager/modalManager";
import { RootStackScreenProps } from "../../navigation/types";
import { AmounButtons } from "./constants";
import TransactionTypeModal from "./modals/transactionTypeModal";
import AmountScreenUtils from "./utils";

const INITIAL = "0.00";

export default function AmountScreen({
  navigation,
}: RootStackScreenProps<"Amount">) {
  const [amount, setAmount] = useState(() => INITIAL);

  const onChangeAmount = (newDigit: number) => {
    setAmount((prev) => {
      if (newDigit === -1) return AmountScreenUtils.deleteCharAmount(prev);
      return AmountScreenUtils.appendAmount(prev, `${newDigit}`);
    });
  };

  const Continue = async () => {
    const transactionType = await modalManager.show(TransactionTypeModal);
    if (transactionType === null) return;
    navigation.navigate("Payment", {
      transactionType,
      amount,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{amount}</Text>
      </View>
      <View style={styles.keyboardContainer}>
        {AmounButtons.map((row, rowIdx) => {
          return (
            <Grid.Row key={rowIdx}>
              {row.map((col, colIdx, arr) => {
                return (
                  <Grid.Col key={colIdx} numRows={arr.length}>
                    <TouchableOpacity
                      style={styles.keyboard}
                      onPress={() => onChangeAmount(col.value)}
                    >
                      <Text style={styles.keyboardText}>{col.display}</Text>
                    </TouchableOpacity>
                  </Grid.Col>
                );
              })}
            </Grid.Row>
          );
        })}
      </View>
      <View style={styles.continue}>
        <TouchableOpacity
          disabled={amount === INITIAL}
          style={styles.continueButton}
          onPress={Continue}
        >
          <Text style={styles.continueText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  displayText: {
    fontSize: 30,
  },
  continue: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  continueButton: {
    backgroundColor: "#84CE78",
    width: "80%",
    paddingVertical: 20,
    borderRadius: 10,
  },
  continueText: {
    textAlign: "center",
    color: "#ffffff",
  },
  keyboardText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  keyboardContainer: {
    flex: 4,
    width: "100%",
  },
  keyboard: {
    height: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    flex: 3,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
