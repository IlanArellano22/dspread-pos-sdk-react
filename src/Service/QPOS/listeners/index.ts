import { NativeModulesProxy, EventEmitter } from "expo-modules-core";
import PosService from "../../../module/QPOS";
import { QPOSListenners, Suscribers } from "../../../types/QPOS";

namespace QPOSListennerManager {
  const emitter = new EventEmitter(
    PosService ?? NativeModulesProxy.DispreadPosSdkReact
  );

  export function addListenners(listenners: QPOSListenners): Suscribers {
    console.log({ listenners });
    let suscriptions: Suscribers = {};
    for (const key in listenners) {
      suscriptions[key] = emitter.addListener(key, listenners[key]);
    }
    return suscriptions;
  }

  export const removeEventListenners = (suscriptions: Suscribers) => {
    for (const key in suscriptions) {
      suscriptions[key as keyof QPOSListenners]?.remove();
      emitter.removeAllListeners(key);
    }
  };
}

export default QPOSListennerManager;
