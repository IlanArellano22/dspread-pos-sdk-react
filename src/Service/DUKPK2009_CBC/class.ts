import DUKPK2009_CBC_NATIVE from "../../module/DUKPK2009_CBC";
import { Enum_key, Enum_mode } from "../../types/DUKPK2009_CBC";

class DUKPK2009_CBC {
  static getDUKPT = (
    ksnV: string,
    datastrV: string,
    key: Enum_key,
    mode: Enum_mode,
    clearIpek: string
  ) => DUKPK2009_CBC_NATIVE.getDUKPT(ksnV, datastrV, key, mode, clearIpek);
  static getDate = (
    ksnV: string,
    datastrV: string,
    key: Enum_key,
    mode: Enum_mode,
    clearIpek: string
  ) => DUKPK2009_CBC_NATIVE.getDate(ksnV, datastrV, key, mode, clearIpek);
  static generatePinBlock = (
    pinKsn: string,
    clearPin: string,
    pan: string,
    clearIpek: string
  ) => DUKPK2009_CBC_NATIVE.generatePinBlock(pinKsn, clearPin, pan, clearIpek);
  static GenerateIPEK = (ksn: number[], bdk: number[]) =>
    DUKPK2009_CBC_NATIVE.GenerateIPEK(ksn, bdk);

  static GetDUKPTKey = (ksn: number[], ipek: number[]) =>
    DUKPK2009_CBC_NATIVE.GetDUKPTKey(ksn, ipek);
  static GetDataKeyVariant = (ksn: number[], ipek: number[]) =>
    DUKPK2009_CBC_NATIVE.GetDataKeyVariant(ksn, ipek);
  static GetPinKeyVariant = (ksn: number[], ipek: number[]) =>
    DUKPK2009_CBC_NATIVE.GetPinKeyVariant(ksn, ipek);
  static GetMacKeyVariant = (ksn: number[], ipek: number[]) =>
    DUKPK2009_CBC_NATIVE.GetMacKeyVariant(ksn, ipek);
  static GetDataKey = (ksn: number[], ipek: number[]) =>
    DUKPK2009_CBC_NATIVE.GetDataKey(ksn, ipek);
  static TriDesEncryption = (byteKey: number[], dec: number[]) =>
    DUKPK2009_CBC_NATIVE.TriDesEncryption(byteKey, dec);
  static TriDesDecryptionCBC = (byteKey: number[], dec: number[]) =>
    DUKPK2009_CBC_NATIVE.TriDesDecryptionCBC(byteKey, dec);
  static TriDesDecryptionECB = (byteKey: number[], dec: number[]) =>
    DUKPK2009_CBC_NATIVE.TriDesDecryptionECB(byteKey, dec);
  static parseHexStr2Byte = (hexStr: string) =>
    DUKPK2009_CBC_NATIVE.parseHexStr2Byte(hexStr);
  static parseByte2HexStr = (buf: number[]) =>
    DUKPK2009_CBC_NATIVE.parseByte2HexStr(buf);
  static dataFill = (dataStr: string) => DUKPK2009_CBC_NATIVE.dataFill(dataStr);
  static xor = (key1: string, key2: string) =>
    DUKPK2009_CBC_NATIVE.xor(key1, key2);
}

export default DUKPK2009_CBC;
