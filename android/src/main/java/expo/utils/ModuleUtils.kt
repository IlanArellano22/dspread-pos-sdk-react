package expo.utils

object ModuleUtils {
    fun ListInt2ByteArray(list: List<Int>): ByteArray {
        val byteArray = ByteArray(list.size);
        for(i in list.indices) {
            val value = list[i];
            if(value in Byte.MIN_VALUE..Byte.MAX_VALUE) {
                byteArray[i] = value.toByte();
            } else {
                throw IllegalArgumentException("");
            }
        }

        return byteArray;
    }
}