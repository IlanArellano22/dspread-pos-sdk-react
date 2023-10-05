import * as React from 'react';

import { DispreadPosSdkReactViewProps } from './DispreadPosSdkReact.types';

export default function DispreadPosSdkReactView(props: DispreadPosSdkReactViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
