import { requireNativeModule } from "expo-modules-core";
import { NativeModule } from "react-native/types";
import { TLVParser_Module } from "../types";

export const TLV_PARSER_NATIVE = requireNativeModule<
  TLVParser_Module & NativeModule
>("DspreadTLVParser");
