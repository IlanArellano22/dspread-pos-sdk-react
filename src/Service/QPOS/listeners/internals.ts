import PosService from "../../../module/QPOS";
import {
  CommunicationMode,
  EncryptType,
  Error,
  PosStatus,
  QPOSListenners,
  QPOSProps,
  TransactionResult,
} from "../../../types/QPOS";
import {
  finishStackQueue,
  rejectStackQueue,
  resolveStackQueue,
} from "../props";

const POSTimeFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

const getInternalListeners = (getProps: () => QPOSProps): QPOSListenners => ({
  onQposIdResult: ({ info }) => {
    const props = getProps();
    resolveStackQueue(props.promises, info, "getQposId");
  },
  onRequestNoQposDetected: () => {
    console.log("Internal No POS detected");
    const props = getProps();
    resolveStackQueue(props.promises, null, "getQposId");
    resolveStackQueue(props.promises, false, "connect");
  },
  onRequestSetAmount: () => {
    console.log("INTERNAL_SET_AMOUNT");
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
      resolveStackQueue(props.promises, true, "connect");
    }
  },
  onRequestQposDisconnected: () => {
    console.log("QPOS DISCONNECTED");
    const props = getProps();
    if (props.posStatus === PosStatus.CONNECTED) {
      props.posStatus = PosStatus.DISCONNECTED;
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
    const props = getProps();
    console.log("onRequestWaitingUser()");
    resolveStackQueue(props.promises, true, "requestSetAmount");
  },
  onRequestDisplay: ({ displayMsg }) => {
    console.log("onRequestDisplay()", displayMsg);
  },
  onRequestDeviceScanFinished: () => {
    console.log("onRequestDeviceScanFinished()");
  },
  onRequestTransactionResult: ({ transactionResult }) => {
    console.log("onRequestTransactionResult()", transactionResult);
    const props = getProps();
    resolveStackQueue(props.promises, true, "doEmvApp");
    switch (transactionResult) {
      case TransactionResult.APPROVED:
        const info = PosService.getICCTag(EncryptType.PLAINTEXT, 1, 1, "5A");
        console.log({ info });
        break;
    }
  },
  onRequestOnlineProcess: ({ tlv }) => {
    console.log("onRequestOnlineProcess()");
    PosService.sendOnlineProcessResult("8A023030");
  },
  onDoTradeResult: (result) => {
    console.log("INTERNAL_TRADE_RESULT");
    const props = getProps();
    resolveStackQueue(props.promises, result, "doTrade");
  },
  onQposInfoResult: ({ posInfoData }) => {
    console.log("onQposInfoResult()", posInfoData);
    const props = getProps();
    resolveStackQueue(props.promises, posInfoData, "getQposInfo");
  },
  onRequestSelectEmvApp: (res) => {
    console.log("onRequestSelectEmvApp()", res);
  },
  onError: ({ errorState }) => {
    console.log({ errorState });
    const props = getProps();
    switch (errorState) {
      case Error.INPUT_INVALID_FORMAT:
        rejectStackQueue(props.promises, "INVALID FORMAT", "requestSetAmount");
        rejectStackQueue(props.promises, "INVALID FORMAT", "doTrade");
        break;
      case Error.AMOUNT_OUT_OF_LIMIT:
        break;
      case Error.APDU_ERROR:
        break;
      case Error.APP_SELECT_TIMEOUT:
        break;
      case Error.CASHBACK_NOT_SUPPORTED:
        break;
      case Error.CMD_NOT_AVAILABLE:
        break;
      case Error.CMD_TIMEOUT:
        break;
      case Error.COMM_ERROR:
        break;
      case Error.CRC_ERROR:
        break;
      case Error.DEVICE_BUSY:
        break;
      case Error.DEVICE_IN_BOOT_STATE:
        break;
      case Error.DEVICE_IN_BOOT_STATE:
        break;
      case Error.DEVICE_RESET:
        break;
      case Error.EMV_APP_CFG_ERROR:
        break;
      case Error.EMV_CAPK_CFG_ERROR:
        break;
      case Error.EXPIRED_CERT:
        break;
      case Error.ICC_EXISTS_ERROR:
        break;
      case Error.ICC_ONLINE_TIMEOUT:
        break;
      case Error.INPUT_INVALID:
        break;
      case Error.INPUT_OUT_OF_RANGE:
        break;
      case Error.INPUT_ZERO_VALUES:
        break;
      case Error.INVALID_TRUSTED_CERT:
        break;
      case Error.MAC_ERROR:
        break;
      case Error.TIMEOUT:
        break;
      case Error.UNKNOWN:
        break;
      case Error.WR_DATA_ERROR:
        break;
    }
  },
});

export default getInternalListeners;
