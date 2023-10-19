import { LinkingOptions } from "@react-navigation/native";
import { TransactionType } from "dispread-pos-sdk-react";

export type RootStackParamList = {
  Amount: undefined;
  Payment: {
    transactionType: TransactionType;
    amount: string;
  };
};

export const LinkingConfiguration: LinkingOptions<RootStackParamList> = {
  prefixes: [],
  config: {
    screens: {
      Amount: "amount",
      Payment: "payment",
    },
  },
};
