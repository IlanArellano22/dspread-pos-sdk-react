import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { DispreadPosSdkReactViewProps } from './DispreadPosSdkReact.types';

const NativeView: React.ComponentType<DispreadPosSdkReactViewProps> =
  requireNativeViewManager('DispreadPosSdkReact');

export default function DispreadPosSdkReactView(props: DispreadPosSdkReactViewProps) {
  return <NativeView {...props} />;
}
