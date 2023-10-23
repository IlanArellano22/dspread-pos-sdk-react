export type SingleElement<T extends any[]> = T extends (infer U)[] ? U : never;

export interface StackEnviroment<T extends { [key: string]: any }[]> {
  get: (predicate?: (el: SingleElement<T>) => boolean) => T;
  set: (newValue: Omit<SingleElement<T>, "stackId">) => void;
  remove: (predicate?: (el: SingleElement<T>) => boolean) => void;
  hasAny: (predicate?: (el: SingleElement<T>) => boolean) => boolean;
}
