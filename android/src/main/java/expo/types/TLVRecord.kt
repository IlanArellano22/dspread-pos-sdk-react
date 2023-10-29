package expo.types

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.utils.TLV

class TLVRecord: Record {
    @Field
    var tag: String? = null
    @Field
    var length: String? = null
    @Field
    var value: String? = null
    @Field
    var isNested = false
    @Field
    var tlvList: List<TLVRecord>? = null
}