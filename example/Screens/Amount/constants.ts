import { TransactionType } from "dspread-pos-sdk-react";
import { AmountButtonProps } from "./types";

export const AmounButtons: AmountButtonProps<number>[][] = [
  [
    {
      display: "1",
      value: 1,
    },
    {
      display: "2",
      value: 2,
    },
    {
      display: "3",
      value: 3,
    },
  ],
  [
    {
      display: "4",
      value: 4,
    },
    {
      display: "5",
      value: 5,
    },
    {
      display: "6",
      value: 6,
    },
  ],
  [
    {
      display: "7",
      value: 7,
    },
    {
      display: "8",
      value: 8,
    },
    {
      display: "9",
      value: 9,
    },
  ],
  [
    {
      display: "00",
      value: 0,
    },
    {
      display: "0",
      value: 0,
    },
    {
      display: "🔙",
      value: -1,
    },
  ],
];

export const TRANSACTION_TYPES: AmountButtonProps<TransactionType>[] = [
  {
    display: "ADMIN",
    value: TransactionType.ADMIN,
  },
  {
    display: "BALANCE_UPDATE",
    value: TransactionType.BALANCE_UPDATE,
  },
  {
    display: "CASH",
    value: TransactionType.CASH,
  },
  {
    display: "CASHBACK",
    value: TransactionType.CASHBACK,
  },
  {
    display: "CASHDEPOSIT",
    value: TransactionType.CASHDEPOSIT,
  },
  {
    display: "ECQ_CASH_LOAD",
    value: TransactionType.ECQ_CASH_LOAD,
  },
  {
    display: "ECQ_CASH_LOAD_VOID",
    value: TransactionType.ECQ_CASH_LOAD_VOID,
  },
  {
    display: "ECQ_DESIGNATED_LOAD",
    value: TransactionType.ECQ_DESIGNATED_LOAD,
  },
  {
    display: "ECQ_INQUIRE_LOG",
    value: TransactionType.ECQ_INQUIRE_LOG,
  },
  {
    display: "ECQ_UNDESIGNATED_LOAD",
    value: TransactionType.ECQ_UNDESIGNATED_LOAD,
  },
  {
    display: "GOODS",
    value: TransactionType.GOODS,
  },
  {
    display: "INQUIRY",
    value: TransactionType.INQUIRY,
  },
  {
    display: "LEGACY_MONEY_ADD",
    value: TransactionType.LEGACY_MONEY_ADD,
  },
  {
    display: "MINI_STATEMENT",
    value: TransactionType.MINI_STATEMENT,
  },
  {
    display: "NON_LEGACY_MONEY_ADD",
    value: TransactionType.NON_LEGACY_MONEY_ADD,
  },
  {
    display: "PAYMENT",
    value: TransactionType.PAYMENT,
  },
  {
    display: "PBOCLOG",
    value: TransactionType.PBOCLOG,
  },
  {
    display: "PREAUTH",
    value: TransactionType.PREAUTH,
  },
  {
    display: "REFUND",
    value: TransactionType.REFUND,
  },
  {
    display: "SALE",
    value: TransactionType.SALE,
  },
  {
    display: "SALES_NEW",
    value: TransactionType.SALES_NEW,
  },
  {
    display: "SERVICES",
    value: TransactionType.SERVICES,
  },
  {
    display: "TRANSFER",
    value: TransactionType.TRANSFER,
  },
  {
    display: "UPDATE_PIN",
    value: TransactionType.UPDATE_PIN,
  },
];
