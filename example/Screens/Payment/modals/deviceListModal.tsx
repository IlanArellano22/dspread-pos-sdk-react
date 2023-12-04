import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ViewProps } from "@ihaz/react-ui-utils/lib/manager/View/comp";
import ModalBase from "../../../components/Manager/modalBase";
import { HandleEvents } from "@ihaz/react-ui-utils/lib/hooks/useEventHandler";
import { BluetoothDevice } from "dspread-pos-sdk-react";
import ModalList from "../../../components/List/modalList";

interface DeviceListModalProps extends ViewProps<BluetoothDevice | null> {
  event: HandleEvents<"deviceChange", BluetoothDevice>;
}

const RenderItem = ({
  onClose,
  ...device
}: BluetoothDevice & ViewProps<BluetoothDevice | null>) => {
  return (
    <TouchableOpacity onPress={() => onClose(device)}>
      <Text>name: {device.name}</Text>
      <Text>address: {device.address}</Text>
    </TouchableOpacity>
  );
};

export default function DeviceListModal({
  onClose,
  event,
}: DeviceListModalProps) {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);

  useEffect(() => {
    const onDeviceFound = (device: BluetoothDevice) => {
      if (!device || !device.name) return;
      setDevices((prev) => {
        const existingDevice = prev.some((x) => x.name === device.name);
        if (existingDevice) return prev;
        return prev.concat(device);
      });
    };
    event.addEventListenner("deviceChange", onDeviceFound);

    return () => {
      event.removeEventListenner("deviceChange", onDeviceFound);
    };
  }, []);

  return (
    <ModalList onRequestClose={() => onClose(null)}>
      <FlatList
        data={devices}
        style={styles.list}
        renderItem={({ item }) => <RenderItem {...item} onClose={onClose} />}
        keyExtractor={(item) => `${item.address}`}
      />
    </ModalList>
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
  },
});
