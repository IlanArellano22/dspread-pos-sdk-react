package expo.utils

open class SingletonHolder<out T: Any, in A, in B>(creator: (A, B) -> T) {
    private var creator: ((A, B) -> T)? = creator
    @Volatile private var instance: T? = null

    fun getInstance(arg0: A, arg1: B): T {
        val i = instance
        if (i != null) {
            return i
        }

        return synchronized(this) {
            val i2 = instance
            if (i2 != null) {
                i2
            } else {
                val created = creator!!(arg0, arg1)
                instance = created
                creator = null
                created
            }
        }
    }

    fun clearInstance() {
        instance = null;
    }
}