import { DecodeData } from "dspread-pos-sdk-react";
import React, { useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackScreenProps } from "../../navigation/types";

interface RenderItemProps {
  transactionKey: Entries[0];
  value: Entries[1];
}
type Entries = [keyof DecodeData, DecodeData[keyof DecodeData]];

const RenderItem = ({ transactionKey, value }: RenderItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.containerText, styles.containerKey]}>
        {transactionKey}:
      </Text>
      <Text style={styles.containerText}>{value}</Text>
    </View>
  );
};

export default function ResultScreen({
  route,
  navigation,
}: RootStackScreenProps<"Result">) {
  const { transactionResult } = route.params;

  const entries = useMemo(
    () => Object.entries(transactionResult.decodeData) as Entries[],
    [transactionResult]
  );

  return (
    <View style={styles.main}>
      <View style={styles.containerTitle}>
        <Text style={styles.mainTitle}>Transaction Result</Text>
      </View>
      <FlatList
        data={entries}
        style={styles.containerMain}
        renderItem={({ item }) => (
          <RenderItem transactionKey={item[0]} value={item[1]} />
        )}
        keyExtractor={(item) => `${item[0]}`}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Amount")}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 10,
  },
  mainTitle: {
    textAlign: "center",
    fontSize: 24,
  },
  containerTitle: {
    flex: 1,
    justifyContent: "center",
  },
  containerMain: {
    flexGrow: 0,
  },
  container: {
    flexDirection: "row",
    marginBottom: 5,
  },
  containerKey: {
    fontWeight: "bold",
  },
  containerText: {
    fontSize: 16,
  },
  footer: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 20,
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
