import { useEventHandler } from "@ihaz/react-ui-utils";
import {
  BluetoothDevice,
  CommunicationMode,
  QPOSId,
  QPOSInfo,
  QPOSServiceManager as pos,
} from "dspread-pos-sdk-react";
import { useEffect, useState } from "react";
import modalManager from "../components/Manager/modalManager";
import DeviceListModal from "../Screens/Payment/modals/deviceListModal";

export default function useSelectBTDevice() {
  const [showModal, setShowModal] = useState(false);
  const events = useEventHandler<"deviceChange", BluetoothDevice>();
  const searchDevices = (device: BluetoothDevice) => {
    setShowModal(true);
    setTimeout(() => {
      events.listen("deviceChange", device);
    }, 500);
  };

  const onCloseListener = (selectedDevice: BluetoothDevice | null) => {
    pos.stopScan();
    if (!selectedDevice) return;
    pos.connectBluetoothDevice(selectedDevice.address);
  };

  useEffect(() => {
    if (showModal) {
      modalManager
        .show(DeviceListModal, { event: events })
        .then(onCloseListener);
    }
  }, [showModal]);

  return { searchDevices };
}
