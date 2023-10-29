export interface DUKPK2009_CBC_Module {
  getDUKPT: (
    ksnV: string,
    datastrV: string,
    key: Enum_key,
    mode: Enum_mode,
    clearIpek: string | null
  ) => string;
  getDate: (
    ksnV: string,
    datastrV: string,
    key: Enum_key,
    mode: Enum_mode,
    clearIpek: string | null
  ) => string;
  generatePinBlock: (
    pinKsn: string,
    clearPin: string,
    pan: string,
    clearIpek: string
  ) => string;
  GenerateIPEK: (ksn: number[], bdk: number[]) => number[];
  GetDUKPTKey: (ksn: number[], ipek: number[]) => number[];
  GetDataKeyVariant: (ksn: number[], ipek: number[]) => number[];
  GetPinKeyVariant: (ksn: number[], ipek: number[]) => number[];
  GetMacKeyVariant: (ksn: number[], ipek: number[]) => number[];
  GetDataKey: (ksn: number[], ipek: number[]) => number[];
  TriDesEncryption: (byteKey: number[], dec: number[]) => number[];
  TriDesDecryptionCBC: (byteKey: number[], dec: number[]) => number[];
  TriDesDecryptionECB: (byteKey: number[], dec: number[]) => number[];
  parseHexStr2Byte: (hexStr: string) => number[];
  parseByte2HexStr: (buf: number[]) => string;
  dataFill: (dataStr: string) => string;
  xor: (key1: string, key2: string) => string;
}

export enum Enum_key {
  DATA,
  PIN,
  MAC,
  DATA_VARIANT,
}

export enum Enum_mode {
  ECB,
  CBC,
}
