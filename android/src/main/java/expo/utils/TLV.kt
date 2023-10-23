package expo.utils

class TLV {
    var tag: String? = null
    var length: String? = null
    var value: String? = null
    var isNested = false
    var tlvList: List<TLV>? = null
    override fun toString(): String {
        return "TLV{" +
                "tag='" + tag + '\'' +
                ", length='" + length + '\'' +
                ", value='" + value + '\'' +
                ", isNested=" + isNested +
                '}'
    }
}
