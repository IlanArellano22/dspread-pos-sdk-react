import React, { createContext, PropsWithChildren, useMemo } from "react";
import { QPOSServiceClass } from "dispread-pos-sdk-react";

interface IQPOSContext {
  pos: QPOSServiceClass;
}

export const QPOSContext = createContext<IQPOSContext>(
  undefined as unknown as IQPOSContext
);

export const QPOSContextProvider = ({ children }: PropsWithChildren) => {
  const pos = useMemo(() => new QPOSServiceClass(), []);

  return (
    <QPOSContext.Provider
      value={{
        pos,
      }}
    >
      {children}
    </QPOSContext.Provider>
  );
};
