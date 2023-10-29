package expo.modules.dspreadpossdkreact

import android.util.Log
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.types.TLVRecord
import expo.utils.TLV
import expo.utils.TLVParser
import org.json.JSONObject

class DspreadTLVParser: Module() {

    private fun TLV2TLVRecord(result:TLV?): TLVRecord? {
        if(result == null) return null;
        val newParse = TLVRecord();
        newParse.isNested = result.isNested;
        newParse.length = result.length;
        newParse.tag = result.tag;
        newParse.value = result.value;
        newParse.tlvList = result.tlvList?.map { tlv -> TLV2TLVRecord(tlv)!! }
        return newParse;
    }

    private fun TLVRecord2TLV(record: TLVRecord): TLV {
        val newParse = TLV();
        newParse.isNested = record.isNested;
        newParse.length = record.length;
        newParse.tag = record.tag;
        newParse.value = record.value;
        newParse.tlvList = record.tlvList?.map { tlv -> TLVRecord2TLV(tlv)!! }
        return newParse;
    }

    private fun RecordList2TLVList(list: List<TLVRecord>): List<TLV> {
        return list.map { tlv -> TLVRecord2TLV(tlv) }
    }
    private fun TLVList2RecordList(list: List<TLV>?): List<TLVRecord>? {
        return list?.map { tlv -> TLV2TLVRecord(tlv)!! }
    }

    override fun definition() = ModuleDefinition {
        Name("DspreadTLVParser");

        Function("parse") {tlv: String ->
            return@Function TLVList2RecordList(TLVParser.parse(tlv))
        }

        Function("parseWithoutValue") {tlv: String ->
            return@Function TLVParser.parseWithoutValue(tlv);
        }

        Function("hexToByteArray") {hexStr: String ->
            return@Function TLVParser.hexToByteArray(hexStr);
        }

        Function("searchTLV") { tlvList: List<TLVRecord>, targetTag: String? ->
            return@Function TLV2TLVRecord(TLVParser.searchTLV(RecordList2TLVList(tlvList), targetTag));
        }

        Function("VerifyTLV") { emvCfg: String ->
            return@Function TLVParser.VerifyTLV(emvCfg);
        }

    }
}