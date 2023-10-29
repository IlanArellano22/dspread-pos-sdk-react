import { requireNativeModule } from "expo-modules-core";
import { NativeModule } from "react-native/types";
import { DUKPK2009_CBC_Module } from "../types";

export const DUKPK2009_CBC_NATIVE = requireNativeModule<
  DUKPK2009_CBC_Module & NativeModule
>("DspreadDUKPK2009_CBC");
