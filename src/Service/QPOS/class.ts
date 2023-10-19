import { CommunicationMode } from "../..";
import PosService from "../../module/QPOS";
import {
  AmountOptions,
  PosStatus,
  QPOSEventType,
  QPOSListenerTag,
  QPOSListenner,
  QPOSListenners,
  QPOSPromise,
  QPOSProps,
  Suscribers,
  TransactionType,
} from "../../types/QPOS";
import Utils from "../../utils";
import QPOSListennerManager from "./listeners";
import getInternalListeners from "./listeners/internals";
import { createStackEnviroment, finishStackQueue } from "./props";

const ERROR_MESSAGES = {
  NO_POS_INITIALIZATED: "POS has no initializated",
  NO_POS_CONNECTED: "POS has no detected",
  ALREADY_INITIALIZATED: "POS already initializated",
  NO_INSTANCE_CREATED: "An internal error has ocurred",
  LISTENERS_NOT_MERGED:
    "Theres not any Context Listeners found to merge for suscribing to native events. POS service only work with internal listeners",
};

class QPOSServiceClass {
  private props!: QPOSProps;
  private listeners!: QPOSListenners;
  private internalListeners!: QPOSListenners;
  private QPOSSuscriptions!: Suscribers;

  constructor() {
    this._init();
  }

  private _init = () => {
    this.props = {
      promises: createStackEnviroment<QPOSPromise[]>([]),
      listeners: createStackEnviroment<QPOSListenner[]>([]),
      posStatus: PosStatus.OFF,
      mode: CommunicationMode.BLUETOOTH,
    };
    this.internalListeners = getInternalListeners(this.getProps.bind(this));
    this.listeners = this.internalListeners;
    this.QPOSSuscriptions = {};
  };

  public addPosListeners = (listenners: QPOSListenners) => {
    this.mergeListeners(listenners);
    this.QPOSSuscriptions = QPOSListennerManager.addListenners(this.listeners);
  };

  public removePosListeners = () => {
    QPOSListennerManager.removeEventListenners(this.QPOSSuscriptions);
    this.listeners = this.internalListeners;
    this.props.listeners.remove();
  };

  /**Merge Context listeners with internal instance´s listeners */
  private mergeListeners = (listenners: QPOSListenners) => {
    this.listeners = Utils.mapObject(
      this.internalListeners,
      (cb, key) =>
        (...args: any[]) => {
          /* @ts-ignore */
          if (cb) cb(...(args || []));
          if (listenners[key])
            /* @ts-ignore */
            listenners[key](...(args || []));
        }
    );
  };

  public getListeners(): QPOSListenners {
    return this.listeners;
  }

  private getProps() {
    return this.props;
  }

  private posStatusMiddleware = () => {
    if (this.props.posStatus !== PosStatus.CONNECTED)
      throw new Error(ERROR_MESSAGES.NO_POS_CONNECTED);
  };

  private setAmountAsync = (amountOptions: AmountOptions) =>
    new Promise<boolean>((resolve, reject) => {
      this.props.amountOptions = amountOptions;
      this.props.promises.set({
        tag: "requestSetAmount",
        resolve,
        reject,
      });
    });

  public getPosStatus = () => {
    return this.props.posStatus;
  };

  public resetPosService = () => {
    PosService.resetPosService();
    this._init();
  };

  initPosService = (mode: CommunicationMode) => {
    if (this.props.posStatus === PosStatus.INITIALIZATED) {
      throw new Error(ERROR_MESSAGES.ALREADY_INITIALIZATED);
    }
    if (this.listeners === this.internalListeners) {
      console.warn(ERROR_MESSAGES.LISTENERS_NOT_MERGED);
    }
    this.props.mode = mode;
    //Create a POS service Instance in the Native Project
    const success = PosService.initPosService(mode);
    if (success) {
      if (this.props.posStatus === PosStatus.CONNECTED) this.resetPosService();
      this.props.posStatus = PosStatus.INITIALIZATED;
    } else {
      throw new Error(ERROR_MESSAGES.NO_INSTANCE_CREATED);
    }
  };

  public connectBluetoothDevice(blueToothAddress: string) {
    if (this.props.posStatus !== PosStatus.INITIALIZATED) {
      throw new Error(ERROR_MESSAGES.NO_POS_INITIALIZATED);
    }
    if (this.props.mode !== CommunicationMode.BLUETOOTH) {
      throw new Error("Comunication mode not defined as BLUETOOTH");
    }
    PosService.connectBluetoothDevice(true, 25, blueToothAddress);
  }

  public doTrade = (timeout: number) => {
    PosService.doTrade(0, timeout);
  };

  public setAmount = (
    amount: string,
    cashbackAmount: string,
    currencyCode: string,
    transactionType: TransactionType
  ) => {
    PosService.setAmount(amount, cashbackAmount, currencyCode, transactionType);
  };

  public stopScan = () => {
    PosService.stopScanQPos2Mode();
  };

  public addEventListener = <K extends QPOSListenerTag>(
    event: K,
    listener: QPOSEventType[K]
  ) => {
    this.props.listeners.set({
      listener,
      tag: event,
    });
  };

  public connect = (timeout: number) => {
    if (this.props.posStatus !== PosStatus.INITIALIZATED) {
      throw new Error(ERROR_MESSAGES.NO_POS_INITIALIZATED);
    }
    if (this.props.mode === null) {
      throw new Error(ERROR_MESSAGES.NO_POS_INITIALIZATED);
    }
    switch (this.props.mode) {
      case CommunicationMode.BLUETOOTH:
        const bluethootStatus = PosService.getBluetoothState();
        if (bluethootStatus) {
          finishStackQueue(
            this.props.listeners,
            (el) => el.listener(true),
            "onBTConnected"
          );
          this.doTrade(20);
        } else {
          const success = PosService.scanQPos2Mode(timeout);
          if (!success)
            throw new Error(
              "Device has not bluethoot enabled or not have user permissions"
            );
        }
        break;
      default:
        break;
    }
  };

  public closePosService = () => {
    PosService.closePosService();
    this.props.posStatus = PosStatus.TERMINATED;
  };

  public destroyPosService = () => {
    if (this.props.posStatus === PosStatus.CONNECTED) {
      this.closePosService();
    }
    PosService.destroy();
    this.props.posStatus = PosStatus.OFF;
  };

  public getQposInfo = () => {
    this.posStatusMiddleware();
    return new Promise((resolve, reject) => {
      PosService.getQposInfo();
      this.props.promises.set({
        tag: "getQposInfo",
        resolve,
        reject,
      });
    });
  };

  public getQposId = () => {
    this.posStatusMiddleware();
    return new Promise<string | null>((resolve, reject) => {
      PosService.getQposId();
      this.props.promises.set({
        tag: "getQposId",
        resolve,
        reject,
      });
    });
  };
}

export default QPOSServiceClass;
