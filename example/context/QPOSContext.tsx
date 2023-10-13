import { createContext, PropsWithChildren } from "react";
import { QPOS, QPOSServiceClass } from "dispread-pos-sdk-react";
import { QPOSListenners } from "dispread-pos-sdk-react";
import { useValueHandler } from "@ihaz/react-ui-utils";
import ObjectUtils from "../utils/object";

interface IQPOSContext {
  getPos: () => QPOSServiceClass | null;
  addEventListeners: (listenners: Partial<QPOSListenners>) => void;
  removeEventListeners: () => void;
}

export const QPOSContext = createContext<IQPOSContext>(
  undefined as unknown as IQPOSContext
);

export const QPOSContextProvider = ({ children }: PropsWithChildren) => {
  const [getPos] = useValueHandler(() => new QPOSServiceClass());
  const [QPOSSuscriptions, setQPOSSuscriptions] =
    useValueHandler<QPOS.Listenners>({});

  const addEventListeners = (listenners: Partial<QPOSListenners>) => {
    const pos = getPos();
    if (!pos || !ObjectUtils.isEmptyObject(QPOSSuscriptions())) return;
    pos.mergeListeners(listenners);
    setQPOSSuscriptions(QPOS.addListenners(pos.getListeners()));
  };

  const removeEventListeners = () => {
    const suscriptions = QPOSSuscriptions();
    for (const key in suscriptions) {
      suscriptions[key as keyof QPOSListenners]?.remove();
    }
    setQPOSSuscriptions({});
  };

  return (
    <QPOSContext.Provider
      value={{
        getPos,
        addEventListeners,
        removeEventListeners,
      }}
    >
      {children}
    </QPOSContext.Provider>
  );
};
