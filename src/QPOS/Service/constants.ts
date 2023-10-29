import { DoTradeResult, TradeResult } from "../types";

export const QPOS_ERROR_MESSAGES = {
  NO_POS_INITIALIZATED: "POS has no initializated",
  NO_POS_CONNECTED: "POS has no detected",
  ALREADY_INITIALIZATED: "POS already initializated",
  NO_INSTANCE_CREATED: "An internal error has ocurred",
  LISTENERS_NOT_MERGED:
    "Theres not any Context Listeners found to merge for suscribing to native events. POS service will only work with internal listeners",
};

export const DEFAULT_TRANSACTION_RESULT: TradeResult = {
  result: DoTradeResult.ICC,
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
