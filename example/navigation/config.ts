import { LinkingOptions } from "@react-navigation/native";
import { TransactionResult, TransactionType } from "dspread-pos-sdk-react";

export type RootStackParamList = {
  Amount: undefined;
  Payment: {
    transactionType: TransactionType;
    amount: string;
  };
  Result: {
    transactionResult: TransactionResult;
  };
};

export const LinkingConfiguration: LinkingOptions<RootStackParamList> = {
  prefixes: [],
  config: {
    screens: {
      Amount: "amount",
      Payment: "payment",
      Result: "result",
    },
  },
};
