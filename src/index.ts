import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to DispreadPosSdkReact.web.ts
// and on native platforms to DispreadPosSdkReact.ts
import DispreadPosSdkReactModule from "./DispreadPosSdkReactModule";
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
  CommunicationMode,
  TransactionType,
} from "./DispreadPosSdkReact.types";
import QPOSServiceClass from "./Service/QPOS/class";

namespace QPOS {
  const emitter = new EventEmitter(
    DispreadPosSdkReactModule ?? NativeModulesProxy.DispreadPosSdkReact
  );

  export type Listenners = Partial<Record<keyof QPOSListenners, Subscription>>;

  export function addListenners(
    listenners: Partial<QPOSListenners>
  ): Listenners {
    console.log({ listenners });
    let suscriptions: Listenners = {};
    for (const key in listenners) {
      suscriptions[key] = emitter.addListener(key, listenners[key]);
    }
    return suscriptions;
  }
}

export {
  QPOSServiceClass,
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
  CommunicationMode,
  TransactionType,
};
