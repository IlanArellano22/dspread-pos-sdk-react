import { DUKPK2009_CBC_NATIVE } from "../Module";
import { Enum_key, Enum_mode } from "../types";

export namespace DUKPK2009_CBC {
  export const getDUKPT = (
    ksnV: string,
    datastrV: string,
    key: Enum_key,
    mode: Enum_mode,
    clearIpek: string | null
  ) => DUKPK2009_CBC_NATIVE.getDUKPT(ksnV, datastrV, key, mode, clearIpek);
  export const getDate = (
    ksnV: string,
    datastrV: string,
    key: Enum_key,
    mode: Enum_mode,
    clearIpek: string
  ) => DUKPK2009_CBC_NATIVE.getDate(ksnV, datastrV, key, mode, clearIpek);
  export const generatePinBlock = (
    pinKsn: string,
    clearPin: string,
    pan: string,
    clearIpek: string
  ) => DUKPK2009_CBC_NATIVE.generatePinBlock(pinKsn, clearPin, pan, clearIpek);
  export const GenerateIPEK = (ksn: number[], bdk: number[]) =>
    DUKPK2009_CBC_NATIVE.GenerateIPEK(ksn, bdk);

  export const GetDUKPTKey = (ksn: number[], ipek: number[]) =>
    DUKPK2009_CBC_NATIVE.GetDUKPTKey(ksn, ipek);
  export const GetDataKeyVariant = (ksn: number[], ipek: number[]) =>
    DUKPK2009_CBC_NATIVE.GetDataKeyVariant(ksn, ipek);
  export const GetPinKeyVariant = (ksn: number[], ipek: number[]) =>
    DUKPK2009_CBC_NATIVE.GetPinKeyVariant(ksn, ipek);
  export const GetMacKeyVariant = (ksn: number[], ipek: number[]) =>
    DUKPK2009_CBC_NATIVE.GetMacKeyVariant(ksn, ipek);
  export const GetDataKey = (ksn: number[], ipek: number[]) =>
    DUKPK2009_CBC_NATIVE.GetDataKey(ksn, ipek);
  export const TriDesEncryption = (byteKey: number[], dec: number[]) =>
    DUKPK2009_CBC_NATIVE.TriDesEncryption(byteKey, dec);
  export const TriDesDecryptionCBC = (byteKey: number[], dec: number[]) =>
    DUKPK2009_CBC_NATIVE.TriDesDecryptionCBC(byteKey, dec);
  export const TriDesDecryptionECB = (byteKey: number[], dec: number[]) =>
    DUKPK2009_CBC_NATIVE.TriDesDecryptionECB(byteKey, dec);
  export const parseHexStr2Byte = (hexStr: string) =>
    DUKPK2009_CBC_NATIVE.parseHexStr2Byte(hexStr);
  export const parseByte2HexStr = (buf: number[]) =>
    DUKPK2009_CBC_NATIVE.parseByte2HexStr(buf);
  export const dataFill = (dataStr: string) =>
    DUKPK2009_CBC_NATIVE.dataFill(dataStr);
  export const xor = (key1: string, key2: string) =>
    DUKPK2009_CBC_NATIVE.xor(key1, key2);
}
