package expo.modules.dspreadpossdkreact

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.utils.ModuleUtils
import libdukpt.DUKPK2009_CBC
import kotlin.jvm.internal.Ref.ByteRef

class DspreadDUKPK2009_CBC : Module() {

    override fun definition() = ModuleDefinition {
        Name("DspreadDUKPK2009_CBC");

        Function("getDUKPT") { ksnV: String, datastrV: String, key: Int, mode: Int, clearIpek: String? ->
           return@Function DUKPK2009_CBC.getDUKPT(ksnV, datastrV, DUKPK2009_CBC.Enum_key.values()[key],DUKPK2009_CBC.Enum_mode.values()[mode], clearIpek)
        }

        Function("getDate") { ksnV: String, datastrV: String, key: Int, mode: Int, clearIpek: String? ->
            return@Function DUKPK2009_CBC.getDate(ksnV, datastrV, DUKPK2009_CBC.Enum_key.values()[key], DUKPK2009_CBC.Enum_mode.values()[mode], clearIpek)
        }

        Function("generatePinBlock") { pinKsn: String?, clearPin: String, pan: String, clearIpek: String? ->
            return@Function DUKPK2009_CBC.generatePinBlock(pinKsn, clearPin, pan, clearIpek)
        }

        Function("GenerateIPEK") { ksn: List<Int>, bdk: List<Int> ->
            return@Function DUKPK2009_CBC.GenerateIPEK(ModuleUtils.ListInt2ByteArray(ksn), ModuleUtils.ListInt2ByteArray(bdk))
        }

        Function("GetDUKPTKey") { ksn: List<Int>, ipek: List<Int> ->
            return@Function DUKPK2009_CBC.GetDUKPTKey(ModuleUtils.ListInt2ByteArray(ksn), ModuleUtils.ListInt2ByteArray(ipek))
        }

        Function("GetDataKeyVariant") { ksn: List<Int>, ipek: List<Int> ->
            return@Function DUKPK2009_CBC.GetDataKeyVariant(ModuleUtils.ListInt2ByteArray(ksn), ModuleUtils.ListInt2ByteArray(ipek))
        }

        Function("GetPinKeyVariant") { ksn: List<Int>, ipek: List<Int> ->
            return@Function DUKPK2009_CBC.GetPinKeyVariant(ModuleUtils.ListInt2ByteArray(ksn), ModuleUtils.ListInt2ByteArray(ipek))
        }

        Function("GetMacKeyVariant") { ksn: List<Int>, ipek: List<Int> ->
            return@Function DUKPK2009_CBC.GetMacKeyVariant(ModuleUtils.ListInt2ByteArray(ksn) ,ModuleUtils.ListInt2ByteArray(ipek))
        }

        Function("GetDataKey") { ksn: List<Int>, ipek: List<Int> ->
            return@Function DUKPK2009_CBC.GetDataKey(ModuleUtils.ListInt2ByteArray(ksn), ModuleUtils.ListInt2ByteArray(ipek))
        }

        Function("TriDesEncryption") { byteKey: List<Int>, dec: List<Int> ->
            return@Function DUKPK2009_CBC.TriDesEncryption(ModuleUtils.ListInt2ByteArray(byteKey), ModuleUtils.ListInt2ByteArray(dec))
        }

        Function("TriDesDecryptionCBC") { byteKey: List<Int>, dec: List<Int> ->
            return@Function DUKPK2009_CBC.TriDesDecryptionCBC(ModuleUtils.ListInt2ByteArray(byteKey), ModuleUtils.ListInt2ByteArray(dec))
        }

        Function("TriDesDecryptionECB") { byteKey: List<Int>, dec:List<Int> ->
            return@Function DUKPK2009_CBC.TriDesDecryptionECB(ModuleUtils.ListInt2ByteArray(byteKey), ModuleUtils.ListInt2ByteArray(dec))
        }

        Function("parseHexStr2Byte") { hexStr: String? ->
            return@Function DUKPK2009_CBC.parseHexStr2Byte(hexStr)
        }

        Function("parseByte2HexStr") { buf: List<Int> ->
            return@Function DUKPK2009_CBC.parseByte2HexStr(ModuleUtils.ListInt2ByteArray(buf))
        }

        Function("dataFill") { dataStr: String ->
            return@Function DUKPK2009_CBC.dataFill(dataStr)
        }

        Function("xor") { key1: String?, key2: String? ->
            return@Function DUKPK2009_CBC.xor(key1, key2)
        }
    }
}