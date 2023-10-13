import { useEffectAsync } from "@ihaz/react-ui-utils";
import { CommunicationMode, QPOSListenners } from "dispread-pos-sdk-react";
import { TransactionType } from "dispread-pos-sdk-react";
import { useContext, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { QPOSContext } from "../../context/QPOSContext";

export default function MainScreen() {
  const { getPos, addEventListeners, removeEventListeners } =
    useContext(QPOSContext);

  const listeners = useMemo<Partial<QPOSListenners>>(
    () => ({
      onRequestQposConnected: () => {
        console.log("QPOS Connected");
      },
      onQposInitModeResult: (isSuccess) => {
        console.log("init Mode success ", isSuccess);
      },
      onError: (code) => {
        console.log("Error ", code);
      },
      onRequestNoQposDetected: () => {
        console.log("No QPOS Detected");
      },
      onQposIdResult(posId) {
        console.log("posId ", posId);
      },
    }),
    []
  );

  useEffectAsync(async () => {
    console.log("effect");
    addEventListeners(listeners);
    const pos = getPos();
    if (pos) {
      console.log("BEFORE INITIALIZE");
      await pos.initPosService(CommunicationMode.BLUETOOTH, {
        amount: "2",
        cashbackAmount: "",
        currencyCode: "156",
        transactionType: TransactionType.GOODS,
      });
      console.log("INITIALIZATED");
    }

    return () => {
      removeEventListeners();
      pos?.destroyPosService();
    };
  }, []);

  const onGetPosId = async () => {
    const pos = getPos();
    if (!pos) return;
    console.log("posIdExecute");
    try {
      const id = await pos.getQposId();
      console.log({ id });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Dispread POS</Text>
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: "#000000",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#ffffff" }} onPress={onGetPosId}>
          GetPosId
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
