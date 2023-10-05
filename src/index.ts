import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to DispreadPosSdkReact.web.ts
// and on native platforms to DispreadPosSdkReact.ts
import DispreadPosSdkReactModule from './DispreadPosSdkReactModule';
import DispreadPosSdkReactView from './DispreadPosSdkReactView';
import { ChangeEventPayload, DispreadPosSdkReactViewProps } from './DispreadPosSdkReact.types';

// Get the native constant value.
export const PI = DispreadPosSdkReactModule.PI;

export function hello(): string {
  return DispreadPosSdkReactModule.hello();
}

export async function setValueAsync(value: string) {
  return await DispreadPosSdkReactModule.setValueAsync(value);
}

const emitter = new EventEmitter(DispreadPosSdkReactModule ?? NativeModulesProxy.DispreadPosSdkReact);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { DispreadPosSdkReactView, DispreadPosSdkReactViewProps, ChangeEventPayload };
