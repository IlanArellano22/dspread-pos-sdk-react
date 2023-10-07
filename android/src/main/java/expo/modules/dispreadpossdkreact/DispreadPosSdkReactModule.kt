package expo.modules.dispreadpossdkreact

import android.bluetooth.BluetoothDevice
import android.os.Handler
import android.os.Looper
import android.util.Log
import com.dspread.xpos.CQPOSService
import com.dspread.xpos.QPOSService
import com.dspread.xpos.QPOSService.DoTradeResult
import com.dspread.xpos.QPOSService.FelicaStatusCode
import com.dspread.xpos.QPOSService.FirmwareStatus
import com.dspread.xpos.QPOSService.QposStatus
import com.dspread.xpos.QPOSService.TransactionResult
import com.dspread.xpos.QPOSService.UpdateInformationResult
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.util.Hashtable

class DispreadPosSdkReactModule : Module() {
  private var pos: QPOSService? = null;

  fun _initPosService() {
    pos = QPOSService.getInstance(appContext.reactContext, QPOSService.CommunicationMode.BLUETOOTH);
    val listener = MyPosClass();
    val handler = Handler(Looper.myLooper()!!);
    pos?.initListener(handler, listener);
  }

  override fun definition() = ModuleDefinition {
    Name("DispreadPosSdkReact")


    Events(*Constants.getPOSEvents().toTypedArray())

    Function("initPosService") {
      if(pos != null) {
        return@Function false;
      } else {
        _initPosService();
        return@Function pos != null;
      }
    }

    Function("getQposId") {
      pos?.getQposId();
    }
    Function("getUpdateCheckValue") {
      pos?.updateCheckValue;
    }
    Function("setMasterKey") { key: String, checkValue: String, keyIndex: Int ->
      pos?.setMasterKey(key, checkValue, keyIndex);
    }
    Function("updateWorkKey") { pik: String,
      pikCheck: String,
      trk: String,
      trkCheck: String,
      mak: String,
      makCheck: String ->
      pos?.updateWorkKey(pik, pikCheck, trk, trkCheck, mak, makCheck);
    }
    Function("updateEMVConfigByXml") { xmlContent: String ->
      pos?.updateEMVConfigByXml(xmlContent);
    }
    Function("getBluetoothState") {
     return@Function pos?.getBluetoothState();
    }

    View(DispreadPosSdkReactView::class) {
      // Defines a setter for the `name` prop.
      Prop("name") { view: DispreadPosSdkReactView, prop: String ->
        println(prop)
      }
    }
  }

  inner class MyPosClass : CQPOSService() {
    override fun onReturnRsaResult(data: String?) {
      super.onReturnRsaResult(data);
      sendEvent("onReturnRsaResult", mapOf(
              "value" to data
      ));
    }

    override fun onQposInitModeResult(isSuccess: Boolean) {
      super.onQposInitModeResult(isSuccess);
      sendEvent("onQposInitModeResult", mapOf(
              "value" to isSuccess
      ));
    }

    override fun onD20StatusResult(data: String?) {
      super.onD20StatusResult(data);
      sendEvent("onD20StatusResult", mapOf(
              "value" to String
      ));
    }

    override fun onQposTestSelfCommandResult(isSuccess: Boolean, datas: String?) {}

    override fun onQposTestCommandResult(isSuccess: Boolean, data: String?) {}

    override fun onQposGetRealTimeSelfDestructStatus(isSuccess: Boolean, dataResult: String?) {}

    override fun onReturPosSelfDestructRecords(isSuccess: Boolean, data: String?) {}

    override fun onQposSetLEDColorResult(isSuccess: Boolean) {}

    override fun onQposGetLEDColorResult(dataResult: String?) {}

    override fun onGetDeviceTestResult(result: Boolean) {}

    override fun onQposRequestPinResult(dataList: List<String?>?, offlineTime: Int) {}

    override fun onReturnD20SleepTimeResult(result: Boolean) {}

    override fun onQposRequestPinStartResult(dataList: List<String?>?) {}

    override fun onQposPinMapSyncResult(isSuccess: Boolean, isNeedPin: Boolean) {}

    override fun onRequestWaitingUser() {}

    override fun onReturnSyncVersionInfo(fmstatus: FirmwareStatus?, firmwareVersion: String?, qposStatus: QposStatus?) {}

    override fun onReturnSpLogResult(data: String?) {}

    override fun onQposIdResult(posId: Hashtable<String?, String?>?) {

    }

    override fun onQposKsnResult(ksn: Hashtable<String?, String?>?) {}

    override fun onQposIsCardExist(cardIsExist: Boolean) {}

    override fun onRequestDeviceScanFinished() {}

    override fun onQposInfoResult(posInfoData: Hashtable<String?, String?>?) {}

    override fun onQposTestResult(testResultData: Hashtable<String?, String?>?) {}

    override fun onQposCertificateInfoResult(posInfoData: List<String?>?) {}

    override fun onQposGenerateSessionKeysResult(rsafoData: Hashtable<String?, String?>?) {}

    override fun onQposDoSetRsaPublicKey(flag: Boolean) {}

    override fun onSearchMifareCardResult(cardData: Hashtable<String?, String?>?) {}

    override fun onBatchReadMifareCardResult(msg: String?, cardData: Hashtable<String?, List<String?>?>?) {}

    override fun onBatchWriteMifareCardResult(msg: String?, cardData: Hashtable<String?, List<String?>?>?) {}

    override fun onDoTradeResult(result: DoTradeResult?, decodeData: Hashtable<String?, String?>?) {}

    override fun onFinishMifareCardResult(flag: Boolean) {}

    override fun onVerifyMifareCardResult(flag: Boolean) {}

    override fun onReadMifareCardResult(flag: Hashtable<String?, String?>?) {}

    override fun onWriteMifareCardResult(flag: Boolean) {}

    override fun onOperateMifareCardResult(flag: Hashtable<String?, String?>?) {}

    override fun getMifareCardVersion(flag: Hashtable<String?, String?>?) {}

    override fun getMifareReadData(flag: Hashtable<String?, String?>?) {}

    override fun getMifareFastReadData(flag: Hashtable<String?, String?>?) {}

    override fun writeMifareULData(flag: String?) {}

    override fun verifyMifareULData(flag: Hashtable<String?, String?>?) {}

    override fun transferMifareData(flag: String?) {}

    override fun onRequestSetAmount() {}

    override fun onRequestSelectEmvApp(appList: ArrayList<String?>?) {}

    override fun onRequestIsServerConnected() {}

    override fun onRequestFinalConfirm() {}

    override fun onRequestOnlineProcess(tlv: String?) {}

    override fun onRequestTime() {}

    override fun onRequestTransactionResult(transactionResult: TransactionResult?) {}

    override fun onRequestTransactionLog(tlv: String?) {}

    override fun onRequestBatchData(tlv: String?) {}

    override fun onRequestQposConnected() {
      super.onRequestQposConnected();
      sendEvent("onRequestQposConnected");
    }

    override fun onRequestQposDisconnected() {}

    override fun onRequestNoQposDetected() {
      super.onRequestNoQposDetected();
      Log.d("Efevooo", "onRequestNoQposDetected");
      sendEvent("onRequestNoQposDetected");
    }

    override fun onRequestNoQposDetectedUnbond() {}

    override fun onError(errorState: QPOSService.Error?) {
      super.onError(errorState);
      Log.d("Efevooo", "onError: $errorState");
      sendEvent("onError", mapOf(
              "value" to errorState
      ));
    }

    override fun onRequestDisplay(displayMsg: QPOSService.Display?) {}

    override fun onReturnReversalData(tlv: String?) {}

    override fun onReturnGetPinInputResult(num: Int) {}

    override fun onReturnGetKeyBoardInputResult(result: String?) {}

    override fun onReturnGetPinResult(result: Hashtable<String?, String?>?) {}

    override fun onReturnPowerOnIccResult(isSuccess: Boolean, ksn: String?, atr: String?, atrLen: Int) {}

    override fun onReturnPowerOffIccResult(isSuccess: Boolean) {}

    override fun onReturnApduResult(isSuccess: Boolean, apdu: String?, apduLen: Int) {}

    override fun onReturnPowerOnFelicaResult(re: FelicaStatusCode?) {}

    override fun onReturnPowerOffFelicaResult(re: FelicaStatusCode?) {}

    override fun onReturnSendApduFelicaResult(re: FelicaStatusCode?, responseLen: String?, responseData: String?) {}

    override fun onReturnSetSleepTimeResult(isSuccess: Boolean) {}

    override fun onGetCardNoResult(cardNo: String?) {}

    override fun onRequestSignatureResult(paras: ByteArray?) {}

    override fun onRequestCalculateMac(calMac: String?) {}

    override fun onRequestUpdateWorkKeyResult(result: UpdateInformationResult?) {}

    override fun onRequestSendTR31KeyResult(result: Boolean) {}

    override fun onReturnCustomConfigResult(isSuccess: Boolean, result: String?) {}

    override fun onRetuenGetTR31Token(data: String?) {}

    override fun onRequestSetPin() {}

    override fun onReturnSetMasterKeyResult(isSuccess: Boolean) {}

    override fun onRequestUpdateKey(result: String?) {}

    override fun onReturnUpdateIPEKResult(isSuccess: Boolean) {}

    override fun onReturnRSAResult(data: String?) {}

    override fun onReturnUpdateEMVResult(isSuccess: Boolean) {}

    override fun onReturnGetQuickEmvResult(isSuccess: Boolean) {}

    override fun onReturnGetEMVListResult(data: String?) {}

    override fun onReturnGetCustomEMVListResult(data: Map<String?, String?>?) {}

    override fun onReturnUpdateEMVRIDResult(isSuccess: Boolean) {}

    override fun onDeviceFound(device: BluetoothDevice?) {}

    override fun onReturnBatchSendAPDUResult(batchAPDUResult: LinkedHashMap<Int?, String?>?) {}

    override fun onBluetoothBonding() {}

    override fun onBluetoothBonded() {}

    override fun onWaitingforData(pinXorPan: String?) {}

    override fun onBluetoothBondFailed() {}

    override fun onBluetoothBondTimeout() {}

    override fun onReturniccCashBack(result: Hashtable<String?, String?>?) {}

    override fun onLcdShowCustomDisplay(isSuccess: Boolean) {}

    override fun onSetCustomLogoDisplay(isSuccess: Boolean) {}

    override fun onUpdatePosFirmwareResult(result: UpdateInformationResult?) {}

    override fun onReturnPosFirmwareUpdateProgressResult(progress: Int) {}

    override fun onBluetoothBoardStateResult(result: Boolean) {}

    override fun onReturnDownloadRsaPublicKey(map: HashMap<String?, String?>?) {}

    override fun onGetPosComm(mod: Int, amount: String?, posid: String?) {}

    override fun onUpdateMasterKeyResult(result: Boolean, resultTable: Hashtable<String?, String?>?) {}

    override fun onPinKey_TDES_Result(result: String?) {}

    override fun onEmvICCExceptionData(tlv: String?) {}

    override fun onSetParamsResult(b: Boolean, resultTable: Hashtable<String?, Any?>?) {}

    override fun onSetVendorIDResult(b: Boolean, resultTable: Hashtable<String?, Any?>?) {}

    override fun onGetInputAmountResult(b: Boolean, amount: String?) {}

    override fun onReturnNFCApduResult(result: Boolean, apdu: String?, apduLen: Int) {}

    override fun onReturnPowerOnNFCResult(result: Boolean, ksn: String?, atr: String?, atrLen: Int) {}

    override fun onReturnMPUCardInfo(hashtable: Hashtable<String?, String?>?) {}

    override fun onReturnPowerOffNFCResult(result: Boolean) {}

    override fun onCbcMacResult(result: String?) {}

    override fun onReadBusinessCardResult(b: Boolean, result: String?) {}

    override fun onReadGasCardResult(b: Boolean, result: String?) {}

    override fun onWriteGasCardResult(b: Boolean) {}

    override fun onWriteBusinessCardResult(b: Boolean) {}

    override fun onConfirmAmountResult(b: Boolean) {}

    override fun onSetManagementKey(b: Boolean) {}

    override fun onSetSleepModeTime(b: Boolean) {}

    override fun onGetSleepModeTime(b: String?) {}

    override fun onGetShutDownTime(b: String?) {}

    override fun onEncryptData(resultTable: Hashtable<String?, String?>?) {}

    override fun onAddKey(b: Boolean) {}

    override fun onSetBuzzerResult(b: Boolean) {}

    override fun onSetBuzzerTimeResult(b: Boolean) {}

    override fun onSetBuzzerStatusResult(b: Boolean) {}

    override fun onGetBuzzerStatusResult(b: String?) {}

    override fun onReturnPlayBuzzerByTypeResult(re: Boolean) {}

    override fun onReturnOperateLEDByTypeResult(re: Boolean) {}

    override fun onQposDoTradeLog(b: Boolean) {}

    override fun onQposDoGetTradeLogNum(b: String?) {}

    override fun onQposDoGetTradeLog(b: String?, orderId: String?) {}

    override fun onRequestDevice() {}

    override fun onGetKeyCheckValue(checkValue: List<String?>?) {}

    override fun onGetDevicePubKey(clearKeys: String?) {}

    override fun onSetPosBluConfig(b: Boolean) {}

    override fun onTradeCancelled() {}

    override fun onReturnSetAESResult(isSuccess: Boolean, result: String?) {}

    override fun onReturnAESTransmissonKeyResult(isSuccess: Boolean, result: String?) {}

    override fun onReturnSignature(b: Boolean, signaturedData: String?) {}

    override fun onReturnConverEncryptedBlockFormat(result: String?) {}

    override fun onQposIsCardExistInOnlineProcess(haveCard: Boolean) {}

    override fun onReturnSetConnectedShutDownTimeResult(isSuccess: Boolean) {}

    override fun onReturnGetConnectedShutDownTimeResult(b: String?) {}

    override fun onRequestNFCBatchData(result: TransactionResult?, tlv: String?) {}

    override fun onReturnupdateKeyByTR_31Result(result: Boolean, keyType: String?) {}

    override fun onRequestGenerateTransportKey(result: Hashtable<*, *>?) {}

    override fun onReturnAnalyseDigEnvelop(result: String?) {}

    override fun onReturnDisplayQRCodeResult(result: Boolean) {}

    override fun onReturnDeviceCSRResult(result: String?) {}

    override fun onReturnStoreCertificatesResult(result: Boolean) {}

    override fun onReturnSignatureAndCertificatesResult(signature: String?, certificates: String?, certificatesChain: String?) {}

    override fun onReturnDeviceSigningCertResult(certificates: String?, certificatesChain: String?) {}

    override fun onReturnServerCertResult(serverSignCert: String?, serverEncryptCert: String?) {}

    override fun onReturnDoInputCustomStr(isSuccess: Boolean, result: String?, initiator: String?) {}

    override fun onReturnPowerOnCardResult(result: Boolean, cardData: Hashtable<String?, String?>?) {}

    override fun onReturnPowerOffCardResult(result: Boolean, cardData: Hashtable<String?, String?>?) {}

    override fun onReturnSearchCardResult(result: Boolean, cardData: Hashtable<String?, String?>?) {}

    override fun onReturnReadCardResult(result: Boolean, cardData: Hashtable<String?, String?>?) {}

    override fun onReturnCheckCardResult(result: Boolean, cardData: Hashtable<String?, String?>?) {}
  }
}
