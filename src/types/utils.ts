export type SingleElement<T extends any[]> = T extends (infer U)[] ? U : never;
