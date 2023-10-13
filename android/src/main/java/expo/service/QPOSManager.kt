package expo.service

import android.content.Context
import androidx.annotation.Nullable
import com.dspread.xpos.QPOSService
import expo.utils.SingletonHolder

class QPOSManager(context: Context?, mode: QPOSService.CommunicationMode) {
    private var pos: QPOSService? = null;
    private val _context = context;
    private val _mode = mode;
    init {
        restartInstance();
    }

    private fun restartInstance() {
        if(pos == null) pos = QPOSService.getInstance(_context, _mode);
    }

    fun destroyInstance() {
        pos = null;
    }

    companion object: SingletonHolder<QPOSManager, Context?, QPOSService.CommunicationMode>(::QPOSManager);

    fun getPos(): QPOSService? {
        return pos;
    }
}