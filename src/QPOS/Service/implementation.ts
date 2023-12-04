import Utils from "../../utils";
import { PosService } from "../Module";
import {
  AmountOptions,
  CardTradeMode,
  PosStatus,
  QPOSListenner,
  QPOSPromise,
  QPOSProps,
  TradeResult,
  CommunicationMode,
  QPOSEventListener,
  QPOSManagerValues,
  QPOSId,
  QPOSInfo,
} from "../types";
import { QPOS_ERROR_MESSAGES } from "./constants";
import { createStackEnviroment } from "./props";

export const createImplMethods = ({
  getProps,
  setProps,
  getQPOSSuscriptions,
}: QPOSManagerValues) => {
  function initProps() {
    const currProps = getProps();
    setProps({
      promises: createStackEnviroment<QPOSPromise[]>([]),
      listeners: createStackEnviroment<QPOSListenner[]>([]),
      posStatus:
        currProps.posStatus !== PosStatus.CONNECTED
          ? PosStatus.OFF
          : currProps.posStatus,
      mode: CommunicationMode.BLUETOOTH,
      amountOptions: undefined,
      extraEmvICCData: undefined,
    });
  }

  const setCardTradeModeImpl = (cardTradeMode?: CardTradeMode) => {
    PosService.setCardTradeMode(
      cardTradeMode ?? CardTradeMode.SWIPE_INSERT_CARD_UNALLOWED_LOW_TRADE
    );
  };

  const posStatusMiddleware = () => {
    let props = getProps();
    switch (props.posStatus) {
      case PosStatus.OFF:
      case PosStatus.DISCONNECTED:
      case PosStatus.TERMINATED:
        throw new Error(QPOS_ERROR_MESSAGES.NO_POS_CONNECTED);
    }
  };

  const addEventListenerImpl: QPOSEventListener = (event, listener) => {
    let props = getProps();
    props.listeners.set({
      listener,
      tag: event,
    });
  };

  const doEmvAppImpl = () =>
    new Promise<TradeResult>((resolve, reject) => {
      let props = getProps();
      props.promises.set({
        tag: "doEmvApp",
        resolve,
        reject,
      });
      PosService.doEmvApp();
    });

  const initPosServiceImpl = (mode: CommunicationMode) => {
    return PosService.initPosService(mode);
  };

  const setAmountImpl = (amountOptions: AmountOptions) =>
    new Promise<boolean>((resolve, reject) => {
      let props = getProps();
      setProps({
        amountOptions,
      });
      props.promises.set({
        tag: "requestSetAmount",
        resolve,
        reject,
      });
    });

  const doTradeImpl = (
    timeout: number,
    amountOptions: AmountOptions
  ): Promise<TradeResult> => {
    return new Promise(async (resolve, reject) => {
      let props = getProps();
      props.promises.set({
        tag: "doTrade",
        resolve,
        reject,
      });
      PosService.doTrade(0, timeout);
      const amountSuccess = await setAmountImpl(amountOptions);
      if (!amountSuccess) reject("unknown ERROR");
    });
  };

  const scanQPos2ModeImpl = (timeout: number) => {
    return PosService.scanQPos2Mode(timeout);
  };

  const resolveSuscriptions = <IResult>(
    resolve: (res: IResult) => void
  ): boolean => {
    const empty = Utils.isEmptyObject(getQPOSSuscriptions());
    if (empty) resolve(null as unknown as IResult);
    return !empty;
  };

  const getQposIdImpl = () =>
    new Promise<QPOSId | null>((resolve, reject) => {
      if (!resolveSuscriptions(resolve)) return;
      let props = getProps();
      props.promises.set({
        tag: "getQposId",
        resolve,
        reject,
      });
      PosService.getQposId();
    });

  const getQposInfoImpl = () =>
    new Promise<QPOSInfo | null>((resolve, reject) => {
      if (!resolveSuscriptions(resolve)) return;
      let props = getProps();
      props.promises.set({
        tag: "getQposInfo",
        resolve,
        reject,
      });
      PosService.getQposInfo();
    });

  const getBluetoothStateImpl = () => {
    return PosService.getBluetoothState();
  };

  const stopScanImpl = () => {
    PosService.stopScanQPos2Mode();
  };

  const getSdkVersionImpl = () => {
    return PosService.getSdkVersion();
  };

  const connectBluetoothDeviceImpl = (blueToothAddress: string) => {
    PosService.connectBluetoothDevice(true, 25, blueToothAddress);
  };

  const closePosService = () => {
    PosService.closePosService();
    setProps({
      posStatus: PosStatus.TERMINATED,
    });
  };

  const destroyPosServiceImpl = () => {
    let props = getProps();
    PosService.destroy();
    if (props.posStatus === PosStatus.CONNECTED) {
      closePosService();
    }
    setProps({
      posStatus: PosStatus.OFF,
    });
  };

  const resetPosServiceImpl = () => {
    PosService.resetPosService();
  };

  return {
    setCardTradeModeImpl,
    addEventListenerImpl,
    doEmvAppImpl,
    initPosServiceImpl,
    doTradeImpl,
    scanQPos2ModeImpl,
    getQposIdImpl,
    getQposInfoImpl,
    getBluetoothStateImpl,
    stopScanImpl,
    destroyPosServiceImpl,
    resetPosServiceImpl,
    connectBluetoothDeviceImpl,
    initProps,
    getSdkVersionImpl,
  };
};
