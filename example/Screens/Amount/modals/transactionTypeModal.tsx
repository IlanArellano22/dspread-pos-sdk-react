import React from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ViewProps } from "@ihaz/react-ui-utils/lib/manager/View/comp";
import { TransactionType } from "dispread-pos-sdk-react";
import { TRANSACTION_TYPES } from "../constants";
import { AmountButtonProps } from "../types";
import ModalBase from "../../../components/Manager/modalBase";
import { commonStyles } from "../../../constants";

interface TransactionTypeModalProps extends ViewProps<TransactionType | null> {}

const RenderItem = ({
  display,
  value,
  onClose,
}: AmountButtonProps<TransactionType> & ViewProps<TransactionType | null>) => {
  return (
    <TouchableOpacity onPress={() => onClose(value)}>
      <Text>{display}</Text>
    </TouchableOpacity>
  );
};

export default function TransactionTypeModal({
  onClose,
}: TransactionTypeModalProps) {
  return (
    <ModalBase
      animationType="slide"
      transparent
      visible
      onRequestClose={() => onClose(null)}
    >
      <FlatList
        data={TRANSACTION_TYPES}
        style={styles.list}
        renderItem={({ item }) => <RenderItem {...item} onClose={onClose} />}
        keyExtractor={(item) => `${item.value}`}
      />
    </ModalBase>
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
    ...commonStyles.testMeasureBorder,
  },
});
