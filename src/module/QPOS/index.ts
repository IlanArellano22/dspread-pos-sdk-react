import { requireNativeModule } from "expo-modules-core";
import { NativeModule } from "react-native/types";
import { DspreadPosModule } from "../../types/QPOS";

const PosService = requireNativeModule<DspreadPosModule & NativeModule>(
  "DspreadPosSdkReact"
);

export default PosService;
