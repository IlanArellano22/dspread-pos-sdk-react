export interface TLVParser_Module {
  parse: (tlv: string) => TLV[];
  parseWithoutValue: (tlv: string) => TLV[];
  hexToByteArray: (hexStr: string) => number[];
  searchTLV: (tlvList: TLV[], targetTag: string) => TLV | null;
  VerifyTLV: (emvCfg: string) => boolean;
}

export interface TLV {
  isNested: boolean;
  length: string;
  tag: string;
  tlvList: null;
  value: string;
}
