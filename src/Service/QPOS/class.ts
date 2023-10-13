import {
  CardTradeMode,
  CHECKVALUE_KEYTYPE,
  CommunicationMode,
  QPOSListenners,
  QPOSService,
  TransactionType,
  UsbOTGDriver,
} from "../../DispreadPosSdkReact.types";
import PosService from "../../DispreadPosSdkReactModule";
import Utils from "../../utils";
import {
  createStackEnviroment,
  QPOSStack,
  rejectStackQueue,
  resolveStackQueue,
  StackEnviroment,
} from "./props";

interface QPOSPromise extends QPOSStack {
  resolve: (value: any | PromiseLike<any>) => void;
  reject: (reason?: any) => void;
}

enum PosStatus {
  INITIALIZATED,
  CONNECTED,
  DISCONNECTED,
  OFF,
  TERMINATED,
}

interface QPOSProps {
  promises: StackEnviroment<QPOSPromise[]>;
  posStatus: PosStatus;
  amountOptions?: AmountOptions;
}

interface AmountOptions {
  amount: string;
  cashbackAmount: string;
  currencyCode: string;
  transactionType: TransactionType;
}

const INITIAL_PROPS: QPOSProps = {
  promises: createStackEnviroment<QPOSPromise[]>([]),
  posStatus: PosStatus.OFF,
};

const getInternalListeners = (
  getProps: () => QPOSProps
): Partial<QPOSListenners> => ({
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
    console.log("onRequestSetAmount");
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
    const props = getProps();
    props.posStatus = PosStatus.CONNECTED;
  },
});

const ERROR_MESSAGES = {
  NO_POS_INITIALIZATED: "POS has no initializated",
  NO_POS_CONNECTED: "POS has no detected",
  ALREADY_INITIALIZATED: "POS already initializated",
  NO_INSTANCE_CREATED: "An internal error has ocurred",
  LISTENERS_NOT_MERGED:
    "Theres not any Context Listeners found to merge for suscribing to native events. POS service only work with internal listeners",
};

class QPOSServiceClass {
  private props: QPOSProps;
  private listeners: Partial<QPOSListenners>;
  private internalListeners: Partial<QPOSListenners>;
  private hasListenersMerged: boolean;

  constructor() {
    this.props = INITIAL_PROPS;
    this.internalListeners = getInternalListeners(this.getProps.bind(this));
    this.listeners = this.internalListeners;
    this.hasListenersMerged = false;
  }

  /**Merge Context listeners with internal instance´s listeners */
  public mergeListeners = (_listeners: Partial<QPOSListenners>) => {
    this.listeners = Utils.mapObject(
      this.internalListeners,
      (cb, key) =>
        (...args: any[]) => {
          /* @ts-ignore */
          if (cb) cb(...(args || []));
          if (_listeners[key])
            /* @ts-ignore */
            _listeners[key](...(args || []));
        }
    );
    this.hasListenersMerged = true;
  };

  public getListeners() {
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

  initPosService = (mode: CommunicationMode, amountOptions: AmountOptions) =>
    new Promise<void>((resolve, reject) => {
      if (this.props.posStatus === PosStatus.INITIALIZATED) {
        reject(ERROR_MESSAGES.ALREADY_INITIALIZATED);
        return;
      }
      if (!this.hasListenersMerged) {
        console.warn(ERROR_MESSAGES.LISTENERS_NOT_MERGED);
      }
      //wait for resolve onRequestSetAmount() listener
      this.setAmountAsync(amountOptions).then((result) => {
        if (result) resolve();
        else reject(ERROR_MESSAGES.NO_POS_INITIALIZATED);
      });
      //Create a POS service Instance in the Native Project
      const success = PosService.initPosService(mode);
      if (success) this.props.posStatus = PosStatus.INITIALIZATED;
      else reject(ERROR_MESSAGES.NO_INSTANCE_CREATED);
    });

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

  public endPosService() {}

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

  public doTrade = (timeout: number) => {};

  public cancelTrade = () => {};

  getUpdateCheckValue = () => {};
  getKeyCheckValue = (
    keyIndex: number,
    checkvalue_keytype: CHECKVALUE_KEYTYPE
  ) => {};
  setMasterKey = (key: string, checkValue: string, keyIndex: number) => {};
  updateWorkKey = (
    pik: string,
    pikCheck: string,
    trk: string,
    trkCheck: string,
    mak: string,
    makCheck: string
  ) => {};
  updateEMVConfigByXml = (xmlContent: string) => {};
  updatePosFirmware = () => {};
  getBluetoothState = () => {
    return false;
  };
  public scanQPos2Mode = (timeout: number) => {};
  startScanQposBLE = (timeout: number) => {};
  stopScanQPos2Mode = () => {};
  clearBluetoothBuffer = () => {};
  disconnectBT = () => {};
  public initService = () => {};
  public closeService = () => {};
  public trade = () => {};
  setDeviceAddress = (address: string) => {};
  openUart = () => {};
  closeUart = () => {};
  openUsb = () => {};
  setD20Trade = (flag: boolean) => {};
  getUpdateProgress = () => {
    return 0;
  };
  setUsbSerialDriver = (driver: UsbOTGDriver) => {};
  connectBluetoothDevice = (blueTootchAddress: string) => {};
  getNFCBatchData = () => {
    return {};
  };
  doEmvApp = () => {};
  setCardTradeMode = (cardTradeMode: CardTradeMode) => {};
  selectEmvApp = (position: number) => {};
  cancelSelectEmvApp = () => {};
}

export default QPOSServiceClass;
