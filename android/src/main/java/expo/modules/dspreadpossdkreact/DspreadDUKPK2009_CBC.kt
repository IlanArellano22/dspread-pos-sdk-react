package expo.modules.dspreadpossdkreact

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import libdukpt.DUKPK2009_CBC

class DspreadDUKPK2009_CBC : Module() {
    override fun definition() = ModuleDefinition {
        Name("DspreadDUKPK2009_CBC");

        Function("getDUKPT") { ksnV: String, datastrV: String, key: Int, mode: Int, clearIpek: String ->
           return@Function DUKPK2009_CBC.getDUKPT(ksnV, datastrV, DUKPK2009_CBC.Enum_key.values()[key],DUKPK2009_CBC.Enum_mode.values()[mode], clearIpek)
        }

        Function("getDate") { ksnV: String, datastrV: String, key: Int, mode: Int, clearIpek: String ->
            return@Function DUKPK2009_CBC.getDate(ksnV, datastrV, DUKPK2009_CBC.Enum_key.values()[key], DUKPK2009_CBC.Enum_mode.values()[mode], clearIpek)
        }

        Function("generatePinBlock") { pinKsn: String?, clearPin: String, pan: String, clearIpek: String? ->
            return@Function DUKPK2009_CBC.generatePinBlock(pinKsn, clearPin, pan, clearIpek)
        }

        Function("GenerateIPEK") { ksn: ByteArray?, bdk: ByteArray? ->
            return@Function DUKPK2009_CBC.GenerateIPEK(ksn, bdk)
        }

        Function("GetDUKPTKey") { ksn: ByteArray?, ipek: ByteArray? ->
            return@Function DUKPK2009_CBC.GetDUKPTKey(ksn, ipek)
        }

        Function("GetDataKeyVariant") { ksn: ByteArray?, ipek: ByteArray? ->
            return@Function DUKPK2009_CBC.GetDataKeyVariant(ksn, ipek)
        }

        Function("GetPinKeyVariant") { ksn: ByteArray?, ipek: ByteArray? ->
            return@Function DUKPK2009_CBC.GetPinKeyVariant(ksn, ipek)
        }

        Function("GetMacKeyVariant") { ksn: ByteArray?, ipek: ByteArray? ->
            return@Function DUKPK2009_CBC.GetMacKeyVariant(ksn, ipek)
        }

        Function("GetDataKey") { ksn: ByteArray?, ipek: ByteArray? ->
            return@Function DUKPK2009_CBC.GetDataKey(ksn, ipek)
        }

        Function("TriDesEncryption") { byteKey: ByteArray, dec: ByteArray? ->
            return@Function DUKPK2009_CBC.TriDesEncryption(byteKey, dec)
        }

        Function("TriDesDecryptionCBC") { byteKey: ByteArray, dec: ByteArray? ->
            return@Function DUKPK2009_CBC.TriDesDecryptionCBC(byteKey, dec)
        }

        Function("TriDesDecryptionECB") { byteKey: ByteArray?, dec: ByteArray? ->
            return@Function DUKPK2009_CBC.TriDesDecryptionECB(byteKey, dec)
        }

        Function("parseHexStr2Byte") { hexStr: String? ->
            return@Function DUKPK2009_CBC.parseHexStr2Byte(hexStr)
        }

        Function("parseByte2HexStr") { buf: ByteArray? ->
            return@Function DUKPK2009_CBC.parseByte2HexStr(buf)
        }

        Function("dataFill") { dataStr: String ->
            return@Function DUKPK2009_CBC.dataFill(dataStr)
        }

        Function("xor") { key1: String?, key2: String? ->
            return@Function DUKPK2009_CBC.xor(key1, key2)
        }
    }
}