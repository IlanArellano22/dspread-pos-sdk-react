import { requireNativeModule } from "expo-modules-core";
import { NativeModule } from "react-native/types";
import { DispreadPosModule } from "../../types/QPOS";

const PosService = requireNativeModule<DispreadPosModule & NativeModule>(
  "DispreadPosSdkReact"
);

export default PosService;
