import PosService from "../../../module/QPOS";
import {
  CommunicationMode,
  PosStatus,
  QPOSListenners,
  QPOSProps,
} from "../../../types/QPOS";
import { finishStackQueue, resolveStackQueue } from "../props";

const POSTimeFormat = (fecha: Date) => {
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");
  const hours = String(fecha.getHours()).padStart(2, "0");
  const minutes = String(fecha.getMinutes()).padStart(2, "0");
  const seconds = String(fecha.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

const getInternalListeners = (getProps: () => QPOSProps): QPOSListenners => ({
  onQposIdResult: (result) => {
    console.log({ internalPosId: result });
    const props = getProps();
    resolveStackQueue(props.promises, result.posId, "getQposId");
  },
  onRequestNoQposDetected: () => {
    console.log("Internal No POS detected");
    const props = getProps();
    resolveStackQueue(props.promises, null, "getQposId");
  },
  onRequestSetAmount: () => {
    const props = getProps();
    const amountOptions = props.amountOptions;
    if (!amountOptions) {
      resolveStackQueue(props.promises, false, "requestSetAmount");
      return;
    }
    PosService.setAmount(
      amountOptions.amount,
      amountOptions.cashbackAmount,
      amountOptions.currencyCode,
      amountOptions.transactionType
    );
    resolveStackQueue(props.promises, true, "requestSetAmount");
    props.amountOptions = undefined;
  },
  onRequestQposConnected: () => {
    console.log("INTERNAL QPOS CONNECTED");
    const props = getProps();
    props.posStatus = PosStatus.CONNECTED;
    if (props.mode === CommunicationMode.BLUETOOTH) {
      finishStackQueue(
        props.listeners,
        (el) => el.listener(null),
        "onBTConnected"
      );
    }
  },
  onDeviceFound: ({ device }) => {
    const props = getProps();
    const listeners = props.listeners.get((el) => el.tag === "onBTConnect");
    listeners.forEach((x) => x.listener(device));
  },
  onRequestTime: () => {
    console.log("onRequestTime()");
    PosService.sendTime(POSTimeFormat(new Date()));
  },
  onRequestWaitingUser: () => {
    console.log("onRequestWaitingUser()");
  },
  onRequestDisplay: (display) => {
    console.log("onRequestDisplay()");
  },
  onRequestDeviceScanFinished: () => {
    console.log("onRequestDeviceScanFinished()");
  },
  onDoTradeResult: (result) => {
    console.log("onDoTradeResult()", result);
  },
  onQposInfoResult: (posInfoData) => {
    console.log("onQposInfoResult()", posInfoData);
    const props = getProps();
    resolveStackQueue(props.promises, posInfoData, "getQposInfo");
  },
});

export default getInternalListeners;
