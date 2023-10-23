package expo.utils

/*
*
* tlv:5F200D202020202020202020202020204F08A0000003330101015F24032412319F160F4243544553543132333435363738009F21031142259A031808039F02060000000011119F03060000000000009F34034203009F120A50424F432044454249549F0607A00000033301015F300202209F4E0F616263640000000000000000000000C40A621067FFFFFFFFF0474FC10A00000332100300E0008BC708B04EFFA147D84FB4C00A00000332100300E00074C28201983ABB68B0A87865BFCAC1FCD6D2794C9C293A667EA2E0DF8FE08658105DF18EE870CDE7714573245EF4F1509F4F7DD2D8AA3A0700570556BB30C5BB3AA0D95C26B9A7A1A0FE45CCCF939D7587D3DBDF3D1D96722F7F9F8C1E0077C89BA4D4D267F74A60CF65E1D66F62685B6E41C25BDAEA4F353EBF9021195824842693CB76733CDEBFC61C6E75F9A87DBB33181C301074FDD300028A1037B8372CE0943EFBA84C82D2448DD142941895136A46CF65F84DFC6A792F502D556DA84106584AFDE8A0838B45E8E1BDAE9747FDF91C10E9D7BC9C5EE15CF0A1746ADDB8F7CB96EA672B127B19FF06A733509B5A04F5BF31D1678C2E5951CABE67E34E97AD946B4DACF3CA500188625890BCA60D7D29A63ED9F6CAEE3369C4E5DC9C2F890200FF24986DD6931BB13FC145D46B1961888B9317263C22351F98796A4FF75CF2262797535D54FD7B58F24535286C3A0EFA9524EE642EB6818EED427F8A447244A883E73FB36AAFB72B2C8EF0829E086CC87E6005E3CBE4C7E3A79CBF339320342B547C4E6D256BB98F78FE9E9A5434EF4CAB734093CD0329667FF2FA
*
* */
object TLVParser {
    private val tlvList: ArrayList<TLV> = ArrayList<TLV>()
    fun parse(tlv: String): List<TLV>? {
        return try {
            tlvList.clear()
            getTLVList(hexToByteArray(tlv))
        } catch (e: Exception) {
            if (tlvList.size > 0) tlvList else null
        }
    }

    private fun getTLVList(data: ByteArray?): List<TLV> {
        var index = 0
        var tag: ByteArray
        var length: ByteArray
        var value: ByteArray
        var isNested: Boolean
        var tlv: TLV? = null
        while (index < data!!.size) {
            isNested = false
            isNested = if (data[index].toInt() and 0x20.toByte().toInt() == 0x20.toByte().toInt()) {
                true
                //复合结构
            } else {
                false
            }
            if (data[index].toInt() and 0x1F.toByte().toInt() == 0x1F.toByte().toInt()) {
                var lastByte = index + 1
                while (data[lastByte].toInt() and 0x80.toByte().toInt() == 0x80.toByte().toInt()) {
                    ++lastByte
                }
                tag = ByteArray(lastByte - index + 1)
                System.arraycopy(data, index, tag, 0, tag.size)
                index += tag.size
            } else {
                tag = ByteArray(1)
                tag[0] = data[index]
                ++index
                if (tag[0].toInt() == 0x00) {
                    break
                }
            }
            if (data[index].toInt() and 0x80.toByte().toInt() == 0x80.toByte().toInt()) {
                val n = (data[index].toInt() and 0x7F.toByte().toInt()) + 1
                length = ByteArray(n)
                System.arraycopy(data, index, length, 0, length.size)
                index += length.size
            } else {
                length = ByteArray(1)
                length[0] = data[index]
                ++index
            }
            val n = getLengthInt(length)
            value = ByteArray(n)
            System.arraycopy(data, index, value, 0, value.size)
            index += value.size
            if (isNested) {
                getTLVList(value)
            } else {
                tlv = TLV()
                tlv.tag = toHexString(tag)
                tlv.length = toHexString(length)
                tlv.value = toHexString(value)
                tlv.isNested = isNested
                tlvList.add(tlv)
            }
        }
        return tlvList
    }

    fun parseWithoutValue(tlv: String): List<TLV>? {
        return try {
            getTLVListWithoutValue(hexToByteArray(tlv))
        } catch (e: Exception) {
            null
        }
    }

    private fun getTLVListWithoutValue(data: ByteArray?): List<TLV> {
        var index = 0
        val tlvList: ArrayList<TLV> = ArrayList<TLV>()
        while (index < data!!.size) {
            var tag: ByteArray
            var length: ByteArray
            var isNested: Boolean
            isNested = if (data[index].toInt() and 0x20.toByte().toInt() == 0x20.toByte().toInt()) {
                true
            } else {
                false
            }
            if (data[index].toInt() and 0x1F.toByte().toInt() == 0x1F.toByte().toInt()) {
                var lastByte = index + 1
                while (data[lastByte].toInt() and 0x80.toByte().toInt() == 0x80.toByte().toInt()) {
                    ++lastByte
                }
                tag = ByteArray(lastByte - index + 1)
                System.arraycopy(data, index, tag, 0, tag.size)
                index += tag.size
            } else {
                tag = ByteArray(1)
                tag[0] = data[index]
                ++index
                if (tag[0].toInt() == 0x00) {
                    break
                }
            }
            if (data[index].toInt() and 0x80.toByte().toInt() == 0x80.toByte().toInt()) {
                val n = (data[index].toInt() and 0x7F.toByte().toInt()) + 1
                length = ByteArray(n)
                System.arraycopy(data, index, length, 0, length.size)
                index += length.size
            } else {
                length = ByteArray(1)
                length[0] = data[index]
                ++index
            }
            val tlv = TLV()
            tlv.tag = toHexString(tag)
            tlv.length = toHexString(length)
            tlv.isNested = isNested
            tlvList.add(tlv)
        }
        return tlvList
    }

    private fun getLengthInt(data: ByteArray): Int {
        return if (data[0].toInt() and 0x80.toByte().toInt() == 0x80.toByte().toInt()) {
            val n = data[0].toInt() and 0x7F.toByte().toInt()
            var length = 0
            for (i in 1 until n + 1) {
                length = length shl 8
                length = length or (data[i].toInt() and 0xFF)
            }
            length
        } else {
            data[0].toInt() and 0xFF
        }
    }

    /*
     * convert hexadecimal string to byte array
    **/
    fun hexToByteArray(hexStr: String): ByteArray? {
        if (hexStr.length < 1) return null
        val result = ByteArray(hexStr.length / 2)
        for (i in 0 until hexStr.length / 2) {
            val high = hexStr.substring(i * 2, i * 2 + 1).toInt(16)
            val low = hexStr.substring(i * 2 + 1, i * 2 + 2).toInt(
                    16)
            result[i] = (high * 16 + low).toByte()
        }
        return result
    }

    internal fun toHexString(b: ByteArray): String {
        var result = ""
        for (i in b.indices) {
            result += Integer.toString((b[i].toInt() and 0xFF) + 0x100, 16).substring(1)
        }
        return result
    }

    fun searchTLV(tlvList: List<TLV>, targetTag: String?): TLV? {
        for (i in tlvList.indices) {
            val tlv: TLV = tlvList[i]
            if (tlv.tag.equals(targetTag,true)) {
                return tlv
            } else if (tlv.isNested) {
                val searchChild: TLV? = searchTLV(tlv.tlvList!!, targetTag)
                if (searchChild != null) {
                    return searchChild
                }
            }
        }
        return null
    }

    @JvmStatic
    fun main(args: Array<String>) {
        val tlv = "5F201A5052415645454E204B554D41522042204E20202020202020202F4F07A00000000310105F24032311309F160F4243544553543132333435363738009F21031244089A031907109F02060000000000059F03060000000000009F34034203009F120A564953412044454249549F0607A00000000310105F300202269F4E0F616263640000000000000000000000C408414367FFFFFF0912C10A10218083100492E0000CC70836D3E567845F788FC00A10218083100492E0000CC2820198BBA22DE72324CD77FBFE7BCA8343BC2F26719BBC1F4633FB0E10329E35018CB35077D634CD3A84F998F52DFAC4F0442E2CD03A85D89BFF630D8A85727132E12C88664FBE5A664BB8AA21FF0D10A2D79E324D87B4225A5B9AAC68BD1FFCF5DD334B38D128B02E983DBBD32EC35DBE26CFFA01C11C272F99D8095107DE981818534873828880F1091B8BC62FD39C8394B19E7A410CF9C870CF27986D0CB251E0B6B2D364DE7F3EF1453B397B9FD2D181668510BA16DE250BEC7C1C6A3C12F7006B6B7660D7B331D326D2EA4990F899B4D11AC17D3C0FF63AEF482A349CD8849D906F60B320832E41D8349316E55DE764F8C0AF6ACE3AACA43B3994536A231BE2E790471EB559F4B9FAA5370067B7A0EA3FE59421B7AC17FA5383C6BB3159EBDE3718FEC72CC20EC1AE178386B4F7B3948C97A439AB0F70A386B392276B9B30D8398BAFE3D01AEAB03079368EEF05248E5FAE7BAB070E527981BB25F441A9224AC66DAE623BECDD9B0D1BB05A6EBCAE1E9151FB7AE3E5034B57BD6C3D609276B7743176179A801AD1B378B4629D08263148859ADDE1687CB5E9D0104D84851E5733F4C95D71E880EF20607C"
        val parse: List<TLV>? = parse(tlv)
        for (tlvcon in parse!!) {
            System.out.println(tlvcon.toString())
        }
    }

    /*
    *
    * Verify the tlv format
    * take the first tlv for judgment, once it encounters 0, it means the end
    * tlv 为true
    * tv 为false
    * */
    fun VerifyTLV(emvCfg: String): Boolean {
        if (emvCfg.startsWith("9F06")) return true
        if (emvCfg.startsWith("00")) return false
        val data = hexToByteArray(emvCfg)
        var index = 0
        val length: ByteArray
        if (data!![index].toInt() and 0x20.toByte().toInt() == 0x20.toByte().toInt()) {
            return false
        }
        if (data[index].toInt() and 0x1F.toByte().toInt() == 0x1F.toByte().toInt()) {
            var lastByte = index + 1
            while (data[lastByte].toInt() and 0x80.toByte().toInt() == 0x80.toByte().toInt()) {
                ++lastByte
            }
            index += lastByte - index + 1
            if (index >= data.size) return false
        } else {
            if (data[index].toInt() == 0x00) {
                return false
            }
            ++index
        }
        if (data[index].toInt() and 0x80.toByte().toInt() == 0x80.toByte().toInt()) {
            val n = (data[index].toInt() and 0x7F.toByte().toInt()) + 1
            length = ByteArray(n)
            index += length.size
        } else {
            length = ByteArray(1)
            length[0] = data[index]
            ++index
        }
        val n = getLengthInt(length)
        return if (n + index > data.size) false else true
    }
}
