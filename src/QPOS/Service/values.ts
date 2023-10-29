import Utils from "../../utils";
import {
  QPOSListenners,
  QPOSManagerValues,
  QPOSProps,
  Suscribers,
} from "../types";

export function createQPOSManagerValues(): QPOSManagerValues {
  let listeners: QPOSListenners = {};
  let internalListeners: QPOSListenners = {};
  let QPOSSuscriptions: Suscribers = {};
  let props: QPOSProps = {} as QPOSProps;

  const getProps: QPOSManagerValues["getProps"] = () => {
    return Object.freeze(Utils.deepCopy(props));
  };

  const getListeners: QPOSManagerValues["getListeners"] = () => {
    return Object.freeze(Utils.deepCopy(listeners));
  };

  const getInternalListeners: QPOSManagerValues["getInternalListeners"] =
    () => {
      return Object.freeze(Utils.deepCopy(internalListeners));
    };

  const getQPOSSuscriptions: QPOSManagerValues["getQPOSSuscriptions"] = () => {
    return Object.freeze(Utils.deepCopy(QPOSSuscriptions));
  };

  const setProps: QPOSManagerValues["setProps"] = (_props) => {
    Object.assign(props, _props);
  };
  const setListeners: QPOSManagerValues["setListeners"] = (_listeners) => {
    Object.assign(listeners, _listeners);
  };
  const setinternalListeners: QPOSManagerValues["setinternalListeners"] = (
    _internalListeners
  ) => {
    Object.assign(internalListeners, _internalListeners);
  };
  const setQPOSSuscriptions: QPOSManagerValues["setQPOSSuscriptions"] = (
    _QPOSSuscriptions
  ) => {
    Object.assign(QPOSSuscriptions, _QPOSSuscriptions);
  };

  return {
    getProps,
    getListeners,
    getInternalListeners,
    getQPOSSuscriptions,
    setProps,
    setListeners,
    setinternalListeners,
    setQPOSSuscriptions,
  };
}
