import {
  AmountOptions,
  CardTradeMode,
  CommunicationMode,
  PosStatus,
  QPOSListenners,
  TradeResult,
  DoTradeResult,
  QPOSEventListener,
} from "../types";
import { QPOS_ERROR_MESSAGES } from "./constants";
import { createImplMethods } from "./implementation";
import { createListenersMethods } from "./listeners";
import { finishStackQueue } from "./props";
import { createQPOSManagerValues } from "./values";

namespace QPOSServiceManager {
  const values = createQPOSManagerValues();

  const {
    addEventListenerImpl,
    destroyPosServiceImpl,
    doEmvAppImpl,
    doTradeImpl,
    getBluetoothStateImpl,
    getQposIdImpl,
    getQposInfoImpl,
    initPosServiceImpl,
    resetPosServiceImpl,
    scanQPos2ModeImpl,
    setCardTradeModeImpl,
    stopScanImpl,
    connectBluetoothDeviceImpl,
    initProps,
  } = createImplMethods(values);
  const {
    _addPosListeners,
    emitPosListeners,
    initListeners,
    removePosListeners,
  } = createListenersMethods(values);

  function _init() {
    initProps();
    initListeners();
    console.log("exec", values.getProps());
  }

  //INITIAL VALUES
  _init();

  export const addEventListener: QPOSEventListener = (event, listener) => {
    addEventListenerImpl(event, listener);
  };

  export const destroyPosService = () => {
    destroyPosServiceImpl();
  };

  export const addPosListeners = (listeners: QPOSListenners) => {
    _addPosListeners(listeners);
  };

  export const initPosService = (mode: CommunicationMode) => {
    const props = values.getProps();
    console.log({ props });
    if (props.posStatus === PosStatus.INITIALIZATED) {
      throw new Error(QPOS_ERROR_MESSAGES.ALREADY_INITIALIZATED);
    }
    values.setProps({
      mode,
    });
    //Create a POS service Instance in the Native Project
    const success = initPosServiceImpl(mode);
    console.log({ success, status: props.posStatus });
    if (success) {
      if (props.posStatus === PosStatus.CONNECTED) resetPosService();
      values.setProps({
        posStatus: PosStatus.INITIALIZATED,
      });
    } else {
      throw new Error(QPOS_ERROR_MESSAGES.NO_INSTANCE_CREATED);
    }
  };

  export const connectBluetoothDevice = (blueToothAddress: string) => {
    const props = values.getProps();
    if (props.posStatus !== PosStatus.INITIALIZATED) {
      throw new Error(QPOS_ERROR_MESSAGES.NO_POS_INITIALIZATED);
    }
    if (props.mode !== CommunicationMode.BLUETOOTH) {
      throw new Error("Comunication mode not defined as BLUETOOTH");
    }
    connectBluetoothDeviceImpl(blueToothAddress);
  };

  const processTrade = async (
    timeout: number,
    amountOptions: AmountOptions
  ): Promise<TradeResult> => {
    const doTradeResult = await doTradeImpl(timeout, amountOptions);

    switch (doTradeResult.result) {
      case DoTradeResult.ICC:
        const envApp = await doEmvAppImpl();
        return envApp;
      default:
        return doTradeResult;
    }
  };

  export const trade = async (
    timeout: number,
    amountOptions: AmountOptions,
    cardTradeMode?: CardTradeMode
  ): Promise<TradeResult> => {
    setCardTradeModeImpl(cardTradeMode);
    return await processTrade(timeout, amountOptions);
  };

  export const stopScan = () => {
    stopScanImpl();
  };

  export const connect = (timeout: number) => {
    return new Promise((resolve, reject) => {
      const props = values.getProps();
      if (props.posStatus !== PosStatus.INITIALIZATED) {
        reject(QPOS_ERROR_MESSAGES.NO_POS_INITIALIZATED);
      }
      if (props.mode === null) {
        reject(QPOS_ERROR_MESSAGES.NO_POS_INITIALIZATED);
      }
      emitPosListeners();
      switch (props.mode) {
        case CommunicationMode.BLUETOOTH:
          const bluethootStatus = getBluetoothStateImpl();
          if (bluethootStatus) {
            values.setProps({
              posStatus: PosStatus.CONNECTED,
            });
            resolve(bluethootStatus);
            finishStackQueue(
              props.listeners,
              (el) => el.listener(true),
              "onBTConnected"
            );
          } else {
            const success = scanQPos2ModeImpl(timeout);
            if (!success)
              reject(
                "Device has not bluethoot enabled or not have user permissions"
              );
            else
              props.promises.set({
                tag: "connect",
                resolve,
                reject,
              });
          }
          break;
        default:
          values.setProps({
            posStatus: PosStatus.OFF,
          });
          reject("Communication mode not supported");
          break;
      }
    });
  };

  export const resetPosService = () => {
    resetPosServiceImpl();
    removePosListeners();
    _init();
  };

  export const getQposInfo = async () => await getQposInfoImpl();

  export const getQposId = async () => await getQposIdImpl();
}

export default QPOSServiceManager;
