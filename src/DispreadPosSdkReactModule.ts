import { requireNativeModule } from "expo-modules-core";
import { NativeModule } from "react-native/types";
import { DispreadPosModule } from "./DispreadPosSdkReact.types";

// It loads the native module object from the JSI or falls back to
// the bridge module (from NativeModulesProxy) if the remote debugger is on.
export default requireNativeModule<DispreadPosModule & NativeModule>(
  "DispreadPosSdkReact"
);
