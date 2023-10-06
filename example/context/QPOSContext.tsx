import { createContext, PropsWithChildren, useEffect } from "react";
import { QPOS } from "dispread-pos-sdk-react";
import { QPOSListenners, QPOSService } from "dispread-pos-sdk-react";
import { useValueHandler } from "@ihaz/react-ui-utils";
import ObjectUtils from "../utils/object";

interface IQPOSContext {
  getPos: () => QPOSService | null;
  removeEventListenners: () => void;
  addEventListenners: (listenners: Partial<QPOSListenners>) => void;
  initPosService: () => void;
  hasInitializated: () => boolean;
}

export const QPOSContext = createContext<IQPOSContext>(
  undefined as unknown as IQPOSContext
);

export const QPOSContextProvider = ({ children }: PropsWithChildren) => {
  const [getPos, setPos] = useValueHandler<QPOSService | null>(null);
  const [QPOSSuscriptions, setQPOSSuscriptions] =
    useValueHandler<QPOS.Listenners>({});
  const [hasInitializated, setHasInitializated] =
    useValueHandler<boolean>(false);

  const initPosService = () => {
    setHasInitializated(QPOS.initPosService());
    setPos(
      ObjectUtils.pick(
        QPOS,
        "getQposId",
        "getUpdateCheckValue",
        "getKeyCheckValue",
        "setMasterKey",
        "updateWorkKey",
        "updateEMVConfigByXml",
        "updatePosFirmware"
      )
    );
  };

  const addEventListenners = (listenners: Partial<QPOSListenners>) => {
    if (!ObjectUtils.isEmptyObject(QPOSSuscriptions())) return;
    setQPOSSuscriptions(QPOS.addListenners(listenners));
  };

  const removeEventListenners = () => {
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
        removeEventListenners,
        addEventListenners,
        initPosService,
        hasInitializated,
      }}
    >
      {children}
    </QPOSContext.Provider>
  );
};
