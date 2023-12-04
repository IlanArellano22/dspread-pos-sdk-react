import Utils from "../../utils";
import {
  QPOSListenners,
  QPOSManagerValues,
  QPOSProps,
  Suscribers,
} from "../types";
import { QPOS_ERROR_MESSAGES } from "./constants";
import createInternalListeners from "./internals";
import { QPOSListennerManager } from "../Module";

export const createListenersMethods = ({
  getListeners,
  getProps,
  getQPOSSuscriptions,
  getInternalListeners,
  setListeners,
  setQPOSSuscriptions,
  setinternalListeners,
  setProps,
}: QPOSManagerValues) => {
  const initListeners = () => {
    const _internalListeners = createInternalListeners({ getProps, setProps });
    setinternalListeners(_internalListeners);
    setListeners(_internalListeners);
    setQPOSSuscriptions({});
  };

  /**Merge Context listeners with internal instance´s listeners */
  const mergeListeners = (listenners: QPOSListenners) => {
    const internalListeners = getInternalListeners();
    setListeners(
      Utils.mapObject(internalListeners, (cb, key) => (...args: any[]) => {
        /* @ts-ignore */
        if (cb) cb(...(args || []));
        if (listenners[key])
          /* @ts-ignore */
          listenners[key](...(args || []));
      })
    );
  };

  const addPosListeners = (listenners: QPOSListenners) => {
    mergeListeners(listenners);
  };

  const removePosListeners = () => {
    const QPOSSuscriptions = getQPOSSuscriptions();
    if (!QPOSSuscriptions || Utils.isEmptyObject(QPOSSuscriptions)) return;
    QPOSListennerManager.removeEventListenners(QPOSSuscriptions);
  };

  const emitPosListeners = () => {
    const listeners = getListeners();
    const internalListeners = getInternalListeners();
    if (!Utils.deepEqual(listeners, internalListeners)) {
      console.warn(QPOS_ERROR_MESSAGES.LISTENERS_NOT_MERGED);
    }
    removePosListeners();
    setQPOSSuscriptions(QPOSListennerManager.addListenners(listeners));
  };

  return {
    addPosListeners,
    initListeners,
    removePosListeners,
    emitPosListeners,
  };
};
