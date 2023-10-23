import { CommunicationMode } from "../..";
import PosService from "../../module/QPOS";
import {
  AmountOptions,
  CardTradeMode,
  DecodeData,
  PosStatus,
  QPOSEventType,
  QPOSListenerTag,
  QPOSListenner,
  QPOSListenners,
  QPOSPromise,
  QPOSProps,
  Suscribers,
  TradeResult,
  TransactionType,
  DoTradeResult,
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

  private removePosListeners = () => {
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

  public getPosStatus = () => {
    return this.props.posStatus;
  };

  public resetPosService = () => {
    PosService.resetPosService();
    this.removePosListeners();
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

  private setAmountImpl = (amountOptions: AmountOptions) =>
    new Promise<boolean>((resolve, reject) => {
      this.props.amountOptions = amountOptions;
      this.props.promises.set({
        tag: "requestSetAmount",
        resolve,
        reject,
      });
    });

  private doTradeImpl = (
    timeout: number,
    amountOptions: AmountOptions
  ): Promise<TradeResult> => {
    return new Promise(async (resolve, reject) => {
      this.props.promises.set({
        tag: "doTrade",
        resolve,
        reject,
      });
      PosService.doTrade(0, timeout);
      const amountSuccess = await this.setAmountImpl(amountOptions);
      if (!amountSuccess) reject("unknown ERROR");
      console.log("---TRADE END---");
    });
  };

  private doEmvAppImpl = () => {
    return new Promise<any>((resolve, reject) => {
      this.props.promises.set({
        tag: "doEmvApp",
        resolve,
        reject,
      });
      PosService.doEmvApp();
    });
  };

  private processTrade = async (
    timeout: number,
    amountOptions: AmountOptions
  ): Promise<TradeResult> => {
    const doTradeResult = await this.doTradeImpl(timeout, amountOptions);

    switch (doTradeResult.result) {
      case DoTradeResult.ICC:
        await this.doEmvAppImpl();
        return {
          result: doTradeResult.result,
          decodeData: {
            cardholderName: "",
            encPAN: "",
            encTrack1: "",
            encTrack2: "",
            encTrack3: "",
            encTracks: "",
            expiryDate: "",
            formatID: "",
            hashPan: "",
            maskedPAN: "",
            newPin: "",
            partialTrack: "",
            pinBlock: "",
            pinKsn: "",
            pinRandomNumber: "",
            psamNo: "",
            serviceCode: "",
            track1Length: "",
            track2Length: "",
            track3Length: "",
            trackksn: "",
            trackRandomNumber: "",
          },
        };
      default:
        return doTradeResult;
    }
  };

  public trade = async (
    timeout: number,
    amountOptions: AmountOptions,
    cardTradeMode?: CardTradeMode
  ): Promise<TradeResult> => {
    this.posStatusMiddleware();
    PosService.setCardTradeMode(
      cardTradeMode ?? CardTradeMode.SWIPE_INSERT_CARD_UNALLOWED_LOW_TRADE
    );
    return await this.processTrade(timeout, amountOptions);
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
    return new Promise((resolve, reject) => {
      if (this.props.posStatus !== PosStatus.INITIALIZATED) {
        reject(ERROR_MESSAGES.NO_POS_INITIALIZATED);
      }
      if (this.props.mode === null) {
        reject(ERROR_MESSAGES.NO_POS_INITIALIZATED);
      }
      switch (this.props.mode) {
        case CommunicationMode.BLUETOOTH:
          const bluethootStatus = PosService.getBluetoothState();
          if (bluethootStatus) {
            this.props.posStatus = PosStatus.CONNECTED;
            resolve(bluethootStatus);
            finishStackQueue(
              this.props.listeners,
              (el) => el.listener(true),
              "onBTConnected"
            );
          } else {
            const success = PosService.scanQPos2Mode(timeout);
            if (!success)
              reject(
                "Device has not bluethoot enabled or not have user permissions"
              );
            else
              this.props.promises.set({
                tag: "connect",
                resolve,
                reject,
              });
          }
          break;
        default:
          break;
      }
    });
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
      this.props.promises.set({
        tag: "getQposInfo",
        resolve,
        reject,
      });
      PosService.getQposInfo();
    });
  };

  public getQposId = () => {
    this.posStatusMiddleware();
    return new Promise<string | null>((resolve, reject) => {
      this.props.promises.set({
        tag: "getQposId",
        resolve,
        reject,
      });
      PosService.getQposId();
    });
  };
}

export default QPOSServiceClass;
