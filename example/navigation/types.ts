import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./config";

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
