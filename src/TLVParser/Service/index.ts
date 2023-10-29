import { TLV_PARSER_NATIVE } from "../Module";
import { TLV } from "../types";

export namespace TLVParser {
  export const parse = (tlv: string) => TLV_PARSER_NATIVE.parse(tlv);
  export const parseWithoutValue = (tlv: string) =>
    TLV_PARSER_NATIVE.parseWithoutValue(tlv);
  export const hexToByteArray = (hexStr: string) =>
    TLV_PARSER_NATIVE.hexToByteArray(hexStr);
  export const searchTLV = (tlvList: TLV[], targetTag: string) =>
    TLV_PARSER_NATIVE.searchTLV(tlvList, targetTag) ?? null;
  export const VerifyTLV = (emvCfg: string) =>
    TLV_PARSER_NATIVE.VerifyTLV(emvCfg);
}
