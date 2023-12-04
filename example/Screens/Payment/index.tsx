import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import ImageComponent from "../../components/Image";
import { RootStackScreenProps } from "../../navigation/types";
import terminalLottie from "../../assets/lottie/terminal.json";
import {
  QPOSListenners,
  TradeResult,
  QPOSServiceManager as pos,
  CardTradeMode,
} from "dspread-pos-sdk-react";
import { useValueHandler } from "@ihaz/react-ui-utils";
import { requestBLEPermissions } from "../../services/permissions";
import useFocusEffectAsync from "../../hooks/useFocusEffectAsync";
import useSelectBTDevice from "../../hooks/useSelectBTDevice";

export default function PaymentScreen({
  route,
  navigation,
}: RootStackScreenProps<"Payment">) {
  const { searchDevices } = useSelectBTDevice();
  const [isCancelled, setIsCancelled] = useValueHandler(false);
  const { amount, transactionType } = route.params;

  const listeners = useMemo<QPOSListenners>(
    () => ({
      onRequestQposConnected: () => {
        console.log("Component QPOS Connected");
      },
      onRequestSetAmount: () => {
        console.log("onRequestSetAmount()");
      },
      onError: ({ errorState }) => {
        console.log("An error has ocurr", errorState);
      },
    }),
    []
  );

  const processResult = (transactionResult: TradeResult) => {
    if (!transactionResult) return;
    navigation.navigate("Result", {
      transactionResult,
    });
  };

  useFocusEffectAsync(async () => {
    pos.addPosListeners(listeners);
    pos.addEventListener("onBTConnect", searchDevices);
    const permission = await requestBLEPermissions();
    if (permission) {
      const success = await pos.connect(20);
      if (success) {
        const result = await pos.trade(
          60,
          {
            amount: amount.replace(".", ""),
            cashbackAmount: "",
            currencyCode: "156",
            transactionType,
          },
          CardTradeMode.SWIPE_TAP_INSERT_CARD_NOTUP_UNALLOWED_LOW_TRADE
        );
        processResult(result);
      }
    }
    return () => {
      console.log("TRANSACTION END");
      pos.resetPosService();
    };
  }, []);

  const onCancel = () => {
    setIsCancelled(true);
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text>Total</Text>
        <Text>${amount}</Text>
        <LottieView
          style={styles.terminalAnimation}
          source={terminalLottie}
          autoPlay
          loop
        />
        <Text>Esperando mediode pago</Text>
        <Text>Inserta tarjeta, desliza o contactless</Text>
        <View style={styles.iconContainer}>
          <ImageComponent style={styles.icon} image="visa" />
          <ImageComponent style={styles.icon} image="mastercard" />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
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
