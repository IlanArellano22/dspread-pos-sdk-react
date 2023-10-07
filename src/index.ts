import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to DispreadPosSdkReact.web.ts
// and on native platforms to DispreadPosSdkReact.ts
import DispreadPosSdkReactModule from "./DispreadPosSdkReactModule";
import DispreadPosSdkReactView from "./DispreadPosSdkReactView";
import {
  ChangeEventPayload,
  DispreadPosSdkReactViewProps,
  QPOSListenners,
  QPOSService,
  CHECKVALUE_KEYTYPE,
  Display,
  DispreadPosModule,
  DoTradeResult,
  Error,
  FelicaStatusCode,
  TransactionResult,
  UpdateInformationResult,
} from "./DispreadPosSdkReact.types";

namespace QPOS {
  //Init Pos Service
  export const initPosService = () =>
    DispreadPosSdkReactModule.initPosService();
  export const getQposId = () => DispreadPosSdkReactModule.getQposId();
  export const getUpdateCheckValue = () =>
    DispreadPosSdkReactModule.getUpdateCheckValue();
  export const getKeyCheckValue: QPOSService["getKeyCheckValue"] = (...args) =>
    DispreadPosSdkReactModule.getKeyCheckValue(...args);
  export const setMasterKey: QPOSService["setMasterKey"] = (...args) =>
    DispreadPosSdkReactModule.setMasterKey(...args);
  export const updateWorkKey: QPOSService["updateWorkKey"] = (...args) =>
    DispreadPosSdkReactModule.updateWorkKey(...args);
  export const updateEMVConfigByXml: QPOSService["updateEMVConfigByXml"] = (
    ...args
  ) => DispreadPosSdkReactModule.updateEMVConfigByXml(...args);
  export const updatePosFirmware = () =>
    DispreadPosSdkReactModule.updatePosFirmware();

  const emitter = new EventEmitter(
    DispreadPosSdkReactModule ?? NativeModulesProxy.DispreadPosSdkReact
  );

  export type Listenners = Partial<Record<keyof QPOSListenners, Subscription>>;

  export function addListenners(
    listenners: Partial<QPOSListenners>
  ): Listenners {
    let suscriptions: Listenners = {};
    for (const key in listenners) {
      suscriptions[key] = emitter.addListener(key, listenners[key]);
    }
    return suscriptions;
  }
}

export {
  DispreadPosSdkReactView,
  QPOS,
  ChangeEventPayload,
  DispreadPosSdkReactViewProps,
  QPOSListenners,
  QPOSService,
  CHECKVALUE_KEYTYPE,
  Display,
  DispreadPosModule,
  DoTradeResult,
  Error,
  FelicaStatusCode,
  TransactionResult,
  UpdateInformationResult,
};
