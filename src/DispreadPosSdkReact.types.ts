export type ChangeEventPayload = {
  value: string;
};

export type DispreadPosSdkReactViewProps = {
  name: string;
};

export enum QPOSConnectionStatus {
  SUCCESS,
  COMUNNICATION_MODE_UNKNOWN,
}

export interface DispreadPosModule extends QPOSService {
  initPosService: () => boolean;
}

export enum DoTradeResult {
  NONE,
  MCR,
  ICC,
  NOT_ICC,
  BAD_SWIPE,
  NO_RESPONSE,
  NO_UPDATE_WORK_KEY,
  NFC_ONLINE,
  NFC_OFFLINE,
  NFC_DECLINED,
  TRY_ANOTHER_INTERFACE,
  CARD_NOT_SUPPORT,
  PLS_SEE_PHONE,
}

export enum Error {
  TIMEOUT,
  MAC_ERROR,
  CMD_TIMEOUT,
  CMD_NOT_AVAILABLE,
  DEVICE_RESET,
  UNKNOWN,
  DEVICE_BUSY,
  INPUT_OUT_OF_RANGE,
  INPUT_INVALID_FORMAT,
  INPUT_ZERO_VALUES,
  INPUT_INVALID,
  CASHBACK_NOT_SUPPORTED,
  CRC_ERROR,
  COMM_ERROR,
  WR_DATA_ERROR,
  EMV_APP_CFG_ERROR,
  EMV_CAPK_CFG_ERROR,
  APDU_ERROR,
  APP_SELECT_TIMEOUT,
  ICC_ONLINE_TIMEOUT,
  AMOUNT_OUT_OF_LIMIT,
  INVALID_TRUSTED_CERT,
  EXPIRED_CERT,
  ICC_EXISTS_ERROR,
  DEVICE_IN_BOOT_STATE,
}

export enum Display {
  TRY_ANOTHER_INTERFACE,
  PLEASE_WAIT,
  REMOVE_CARD,
  CLEAR_DISPLAY_MSG,
  PROCESSING,
  PIN_OK,
  TRANSACTION_TERMINATED,
  INPUT_PIN_ING,
  MAG_TO_ICC_TRADE,
  INPUT_OFFLINE_PIN_ONLY,
  CARD_REMOVED,
  INPUT_LAST_OFFLINE_PIN,
  MSR_DATA_READY,
  NOT_ALLOWED_LOW_TRADE,
  PlEASE_TAP_CARD_AGAIN,
}

export enum FelicaStatusCode {
  NFC_FELICA_SUCCESS,
  NFC_FELICA_PARAM_ERROR,
  NFC_FELICA_POLL_ERROR,
  NFC_FELICA_OPERATION_ERROR,
  NFC_FELICA_RAW_TRANS_ERROR,
  NFC_FELICA_TIMEOUT,
  NFC_FELICA_ERROR_END,
}

export enum UpdateInformationResult {
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  UPDATE_PACKET_VEFIRY_ERROR,
  UPDATE_PACKET_LEN_ERROR,
  UPDATE_LOWPOWER,
  UPDATING,
  USB_RECONNECTING,
  UPDATE_CMD_ERROR,
  UPDATE_SIGNATURE_ERROR,
  UPDATE_FRAME_LENGTH_ERROR,
  UPDATE_DATA_FORMAT_ERROR,
  UPDATE_WRITE_VALUE_ERROR,
  UPGRADE_NOT_FINISH,
}

export enum TransactionResult {
  APPROVED,
  TERMINATED,
  DECLINED,
  CANCEL,
  CAPK_FAIL,
  NOT_ICC,
  SELECT_APP_FAIL,
  DEVICE_ERROR,
  CARD_NOT_SUPPORTED,
  MISSING_MANDATORY_DATA,
  CARD_BLOCKED_OR_NO_EMV_APPS,
  INVALID_ICC_DATA,
  FALLBACK,
  NFC_TERMINATED,
  CARD_REMOVED,
  TRADE_LOG_FULL,
  TRANSACTION_NOT_ALLOWED_AMOUNT_EXCEED,
  CONTACTLESS_TRANSACTION_NOT_ALLOW,
  TRANS_TOKEN_INVALID,
  CARD_BLOCKED,
  APP_BLOCKED,
  MULTIPLE_CARDS,
}

export enum CHECKVALUE_KEYTYPE {
  MKSK_TMK,
  MKSK_PIK,
  MKSK_TDK,
  MKSK_MCK,
  TCK,
  MAGK,
  DUKPT_TRK_IPEK,
  DUKPT_EMV_IPEK,
  DUKPT_PIN_IPEK,
  DUKPT_TRK_KSN,
  DUKPT_EMV_KSN,
  DUKPT_PIN_KSN,
  DUKPT_MKSK_ALLTYPE,
}

export interface QPOSService {
  getQposId: () => void;
  getUpdateCheckValue: () => void;
  getKeyCheckValue: (
    keyIndex: number,
    checkvalue_keytype: CHECKVALUE_KEYTYPE
  ) => void;
  setMasterKey: (key: string, checkValue: string, keyIndex: number) => void;
  updateWorkKey: (
    pik: string,
    pikCheck: string,
    trk: string,
    trkCheck: string,
    mak: string,
    makCheck: string
  ) => void;
  updateEMVConfigByXml: (xmlContent: string) => void;
  updatePosFirmware: () => void;
  getBluetoothState: () => boolean;
}

export interface QPOSListenners {
  onReturnRsaResult: (data: string) => void;
  onQposInitModeResult: (isSuccess: boolean) => void;

  onD20StatusResult: (data: string) => void;

  onQposTestSelfCommandResult: (isSuccess: boolean, datas: string) => void;

  onQposTestCommandResult: (isSuccess: boolean, data: string) => void;

  onQposGetRealTimeSelfDestructStatus: (
    isSuccess: boolean,
    dataResult: string
  ) => void;

  onReturPosSelfDestructRecords: (isSuccess: boolean, data: string) => void;

  onQposSetLEDColorResult: (isSuccess: boolean) => void;

  onQposGetLEDColorResult: (dataResult: string) => void;

  onGetDeviceTestResult: (result: boolean) => void;

  onQposRequestPinResult: (dataList: string[], offlineTime: number) => void;

  onReturnD20SleepTimeResult: (result: boolean) => void;

  onQposRequestPinStartResult: (dataList: string[]) => void;

  onQposPinMapSyncResult: (isSuccess: boolean, isNeedPin: boolean) => void;

  onRequestWaitingUser: () => void;

  onReturnSyncVersionInfo: (
    fmstatus: number,
    firmwareVersion: string,
    qposStatus: number
  ) => void;

  onReturnSpLogResult: (data: string) => void;

  onQposIdResult: (posId: Record<string, string>) => void;

  onQposKsnResult: (ksn: Record<string, string>) => void;

  onQposIsCardExist: (cardIsExist: boolean) => void;

  onRequestDeviceScanFinished: () => void;

  onQposInfoResult: (posInfoData: Record<string, string>) => void;

  onQposTestResult: (testResultData: Record<string, string>) => void;

  onQposCertificateInfoResult: (posInfoData: string[]) => void;

  onQposGenerateSessionKeysResult: (rsafoData: Record<string, string>) => void;

  onQposDoSetRsaPublicKey: (flag: boolean) => void;

  onSearchMifareCardResult: (cardData: Record<string, string>) => void;

  onBatchReadMifareCardResult: (
    msg: string,
    cardData: Record<string, string[]>
  ) => void;

  onBatchWriteMifareCardResult: (
    msg: string,
    cardData: Record<string, string[]>
  ) => void;

  onDoTradeResult: (
    result: DoTradeResult,
    decodeData: Record<string, string>
  ) => void;

  onFinishMifareCardResult: (flag: boolean) => void;

  onVerifyMifareCardResult: (flag: boolean) => void;

  onReadMifareCardResult: (flag: Record<string, string>) => void;

  onWriteMifareCardResult: (flag: boolean) => void;

  onOperateMifareCardResult: (flag: Record<string, string>) => void;

  getMifareCardVersion: (flag: Record<string, string>) => void;

  getMifareReadData: (flag: Record<string, string>) => void;

  getMifareFastReadData: (flag: Record<string, string>) => void;

  writeMifareULData: (flag: string) => void;

  verifyMifareULData: (flag: Record<string, string>) => void;

  transferMifareData: (flag: string) => void;

  onRequestSetAmount: () => void;

  onRequestSelectEmvApp: (appList: string[]) => void;

  onRequestIsServerConnected: () => void;

  onRequestFinalConfirm: () => void;

  onRequestOnlineProcess: (tlv: string) => void;

  onRequestTime: () => void;

  onRequestTransactionResult: (transactionResult: TransactionResult) => void;

  onRequestTransactionLog: (tlv: string) => void;

  onRequestBatchData: (tlv: string) => void;

  onRequestQposConnected: () => void;

  onRequestQposDisconnected: () => void;

  onRequestNoQposDetected: () => void;

  onRequestNoQposDetectedUnbond: () => void;

  onError: (errorState: Error) => void;

  onRequestDisplay: (displayMsg: Display) => void;

  onReturnReversalData: (tlv: string) => void;

  onReturnGetPinInputResult: (num: number) => void;

  onReturnGetKeyBoardInputResult: (result: string) => void;

  onReturnGetPinResult: (result: Record<string, string>) => void;

  onReturnPowerOnIccResult: (
    isSuccess: boolean,
    ksn: string,
    atr: string,
    atrLen: number
  ) => void;

  onReturnPowerOffIccResult: (isSuccess: boolean) => void;

  onReturnApduResult: (
    isSuccess: boolean,
    apdu: string,
    apduLen: number
  ) => void;

  onReturnPowerOnFelicaResult: (re: FelicaStatusCode) => void;

  onReturnPowerOffFelicaResult: (re: FelicaStatusCode) => void;

  onReturnSendApduFelicaResult: (
    re: FelicaStatusCode,
    responseLen: string,
    responseData: string
  ) => void;

  onReturnSetSleepTimeResult: (isSuccess: boolean) => void;

  onGetCardNoResult: (cardNo: string) => void;

  onRequestSignatureResult: (paras: number[]) => void;

  onRequestCalculateMac: (calMac: string) => void;

  onRequestUpdateWorkKeyResult: (result: UpdateInformationResult) => void;

  onRequestSendTR31KeyResult: (result: boolean) => void;

  onReturnCustomConfigResult: (isSuccess: boolean, result: string) => void;

  onRetuenGetTR31Token: (data: string) => void;

  onRequestSetPin: () => void;

  onReturnSetMasterKeyResult: (isSuccess: boolean) => void;

  onRequestUpdateKey: (result: string) => void;

  onReturnUpdateIPEKResult: (isSuccess: boolean) => void;

  onReturnRSAResult: (data: string) => void;

  onReturnUpdateEMVResult: (isSuccess: boolean) => void;

  onReturnGetQuickEmvResult: (isSuccess: boolean) => void;

  onReturnGetEMVListResult: (data: string) => void;

  onReturnGetCustomEMVListResult: (data: Record<string, string>) => void;

  onReturnUpdateEMVRIDResult: (isSuccess: boolean) => void;

  onReturnBatchSendAPDUResult: (
    batchAPDUResult: Record<number, string>
  ) => void;

  onBluetoothBonding: () => void;

  onBluetoothBonded: () => void;

  onWaitingforData: (pinXorPan: string) => void;

  onBluetoothBondFailed: () => void;

  onBluetoothBondTimeout: () => void;

  onReturniccCashBack: (result: Record<string, string>) => void;

  onLcdShowCustomDisplay: (isSuccess: boolean) => void;

  onSetCustomLogoDisplay: (isSuccess: boolean) => void;

  onUpdatePosFirmwareResult: (result: UpdateInformationResult) => void;

  onReturnPosFirmwareUpdateProgressResult: (progress: number) => void;

  onBluetoothBoardStateResult: (result: boolean) => void;

  onReturnDownloadRsaPublicKey: (map: Record<string, string>) => void;

  onGetPosComm: (mod: number, amount: string, posid: string) => void;

  onUpdateMasterKeyResult: (
    result: boolean,
    resultTable: Record<string, string>
  ) => void;

  onPinKey_TDES_Result: (result: string) => void;

  onEmvICCExceptionData: (tlv: string) => void;

  onSetParamsResult: (b: boolean, resultTable: Record<string, string>) => void;

  onSetVendorIDResult: (b: boolean, resultTable: Record<string, any>) => void;

  onGetInputAmountResult: (b: boolean, amount: string) => void;

  onReturnNFCApduResult: (
    result: boolean,
    apdu: string,
    apduLen: number
  ) => void;

  onReturnPowerOnNFCResult: (
    result: boolean,
    ksn: string,
    atr: string,
    atrLen: number
  ) => void;

  onReturnMPUCardInfo: (hashtable: Record<string, string>) => void;

  onReturnPowerOffNFCResult: (result: boolean) => void;

  onCbcMacResult: (result: string) => void;

  onReadBusinessCardResult: (b: boolean, result: string) => void;

  onReadGasCardResult: (b: boolean, result: string) => void;

  onWriteGasCardResult: (b: boolean) => void;

  onWriteBusinessCardResult: (b: boolean) => void;

  onConfirmAmountResult: (b: boolean) => void;

  onSetManagementKey: (b: boolean) => void;

  onSetSleepModeTime: (b: boolean) => void;

  onGetSleepModeTime: (b: string) => void;

  onGetShutDownTime: (b: string) => void;

  onEncryptData: (resultTable: Record<string, string>) => void;

  onAddKey: (b: boolean) => void;

  onSetBuzzerResult: (b: boolean) => void;

  onSetBuzzerTimeResult: (b: boolean) => void;

  onSetBuzzerStatusResult: (b: boolean) => void;

  onGetBuzzerStatusResult: (b: string) => void;

  onReturnPlayBuzzerByTypeResult: (re: boolean) => void;

  onReturnOperateLEDByTypeResult: (re: boolean) => void;

  onQposDoTradeLog: (b: boolean) => void;

  onQposDoGetTradeLogNum: (b: string) => void;

  onQposDoGetTradeLog: (b: string, orderId: string) => void;

  onRequestDevice: () => void;

  onGetKeyCheckValue: (checkValue: string[]) => void;

  onGetDevicePubKey: (clearKeys: string) => void;

  onSetPosBluConfig: (b: boolean) => void;

  onTradeCancelled: () => void;

  onReturnSetAESResult: (isSuccess: boolean, result: string) => void;

  onReturnAESTransmissonKeyResult: (isSuccess: boolean, result: string) => void;

  onReturnSignature: (b: boolean, signaturedData: string) => void;

  onReturnConverEncryptedBlockFormat: (result: string) => void;

  onQposIsCardExistInOnlineProcess: (haveCard: boolean) => void;

  onReturnSetConnectedShutDownTimeResult: (isSuccess: boolean) => void;

  onReturnGetConnectedShutDownTimeResult: (b: string) => void;

  onRequestNFCBatchData: (result: TransactionResult, tlv: string) => void;

  onReturnupdateKeyByTR_31Result: (result: boolean, keyType: string) => void;

  onRequestGenerateTransportKey: (result: Record<string, any>) => void;

  onReturnAnalyseDigEnvelop: (result: string) => void;

  onReturnDisplayQRCodeResult: (result: boolean) => void;

  onReturnDeviceCSRResult: (result: string) => void;

  onReturnStoreCertificatesResult: (result: boolean) => void;

  onReturnSignatureAndCertificatesResult: (
    signature: string,
    certificates: string,
    certificatesChain: string
  ) => void;

  onReturnDeviceSigningCertResult: (
    certificates: string,
    certificatesChain: string
  ) => void;

  onReturnServerCertResult: (
    serverSignCert: string,
    serverEncryptCert: string
  ) => void;

  onReturnDoInputCustomStr: (
    isSuccess: boolean,
    result: string,
    initiator: string
  ) => void;

  onReturnPowerOnCardResult: (
    result: boolean,
    cardData: Record<string, string>
  ) => void;

  onReturnPowerOffCardResult: (
    result: boolean,
    cardData: Record<string, string>
  ) => void;

  onReturnSearchCardResult: (
    result: boolean,
    cardData: Record<string, string>
  ) => void;

  onReturnReadCardResult: (
    result: boolean,
    cardData: Record<string, string>
  ) => void;

  onReturnCheckCardResult: (
    result: boolean,
    cardData: Record<string, string>
  ) => void;
}
