import React, { useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import ImageComponent from "../../components/Image";
import { RootStackScreenProps } from "../../navigation/types";
import terminalLottie from "../../assets/lottie/terminal.json";
import { QPOSContext } from "../../context/QPOSContext";
import {
  BluetoothDevice,
  CommunicationMode,
  QPOSListenners,
} from "dispread-pos-sdk-react";
import { useEffectAsync, useEventHandler } from "@ihaz/react-ui-utils";
import modalManager from "../../components/Manager/modalManager";
import DeviceListModal from "./modals/deviceListModal";
import { requestBLEPermissions } from "../../services/permissions";

export default function PaymentScreen({
  route,
}: RootStackScreenProps<"Payment">) {
  const { pos } = useContext(QPOSContext);
  const events = useEventHandler<"deviceChange", BluetoothDevice>();
  const [showModal, setShowModal] = useState(false);
  const { amount, transactionType } = route.params;

  const listeners = useMemo<QPOSListenners>(
    () => ({
      onRequestQposConnected: () => {
        console.log("Component QPOS Connected");
        pos.doTrade(20);
      },
      onRequestSetAmount: () => {
        console.log("onRequestSetAmount()");
        pos.setAmount(amount.replace(".", ""), "", "156", transactionType);
      },
      onError: () => {
        console.log("An error has ocurr");
      },
    }),
    []
  );

  const onCloseListener = (selectedDevice: BluetoothDevice | null) => {
    pos.stopScan();
    if (!selectedDevice) return;
    pos.connectBluetoothDevice(selectedDevice.address);
  };

  const searchDevices = (device: BluetoothDevice) => {
    console.log({ device });
    setShowModal(true);
    setTimeout(() => {
      events.listen("deviceChange", device);
    }, 500);
  };

  const onDeviceConnected = () => {
    console.log("deviceConnected");
  };

  useEffect(() => {
    if (showModal) {
      modalManager
        .show(DeviceListModal, { event: events })
        .then(onCloseListener);
    }
  }, [showModal]);

  useEffectAsync(async () => {
    pos.addPosListeners(listeners);
    pos.initPosService(CommunicationMode.BLUETOOTH);
    pos.addEventListener("onBTConnect", searchDevices);
    pos.addEventListener("onBTConnected", onDeviceConnected);
    const permission = await requestBLEPermissions();
    if (permission) {
      pos.connect(20);
    }

    return () => {
      pos.removePosListeners();
      pos.resetPosService();
    };
  }, []);

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
        <TouchableOpacity style={styles.cancelButton}>
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
