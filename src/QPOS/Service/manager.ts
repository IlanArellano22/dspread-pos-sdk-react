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
  const implMethods = createImplMethods(values);
  const listenersMethods = createListenersMethods(values);

  function _init() {
    implMethods.initProps();
    listenersMethods.initListeners();
    console.log("exec", values.getProps());
  }

  //INITIAL VALUES
  _init();

  export const addEventListener: QPOSEventListener = (event, listener) => {
    implMethods.addEventListenerImpl(event, listener);
  };

  export const destroyPosService = () => {
    implMethods.destroyPosServiceImpl();
  };

  export const addPosListeners = (listeners: QPOSListenners) => {
    listenersMethods.addPosListeners(listeners);
  };

  export const initPosService = (mode: CommunicationMode): boolean => {
    const props = values.getProps();
    if (props.posStatus === PosStatus.INITIALIZATED) {
      throw new Error(QPOS_ERROR_MESSAGES.ALREADY_INITIALIZATED);
    }
    values.setProps({
      mode,
    });
    //Create a POS service Instance in the Native Project
    const success = implMethods.initPosServiceImpl(mode);
    if (success) {
      if (props.posStatus === PosStatus.CONNECTED) resetPosService();
      values.setProps({
        posStatus: PosStatus.INITIALIZATED,
      });
      return success;
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
    implMethods.connectBluetoothDeviceImpl(blueToothAddress);
  };

  const processTrade = async (
    timeout: number,
    amountOptions: AmountOptions
  ): Promise<TradeResult> => {
    const doTradeResult = await implMethods.doTradeImpl(timeout, amountOptions);

    switch (doTradeResult.result) {
      case DoTradeResult.ICC:
        const envApp = await implMethods.doEmvAppImpl();
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
    implMethods.setCardTradeModeImpl(cardTradeMode);
    return await processTrade(timeout, amountOptions);
  };

  export const stopScan = () => {
    implMethods.stopScanImpl();
  };

  export const connect = (timeout: number) => {
    return new Promise<boolean>((resolve, reject) => {
      const props = values.getProps();
      if (
        props.mode === null ||
        ![PosStatus.INITIALIZATED, PosStatus.CONNECTED].includes(
          props.posStatus
        )
      ) {
        reject(QPOS_ERROR_MESSAGES.NO_POS_INITIALIZATED);
        return;
      }
      listenersMethods.emitPosListeners();
      switch (props.mode) {
        case CommunicationMode.BLUETOOTH:
          const bluethootStatus = implMethods.getBluetoothStateImpl();
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
            const success = implMethods.scanQPos2ModeImpl(timeout);
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
    implMethods.resetPosServiceImpl();
    listenersMethods.removePosListeners();
    _init();
  };

  export const getQposInfo = async () => await implMethods.getQposInfoImpl();

  export const getQposId = async () => await implMethods.getQposIdImpl();

  export const getSdkVersion = () => implMethods.getSdkVersionImpl();
}

export default QPOSServiceManager;
