package expo.types

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class BluetoothDevice : Record {
    @Field
    var name: String= ""
    @Field
    var address: String = ""
    @Field
    var bondState: Int = 0
}