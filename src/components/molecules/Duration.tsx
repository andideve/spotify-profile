import React, { useMemo } from 'react';
import formatDuration from 'format-duration';

export interface DurationProps extends React.HTMLAttributes<HTMLSpanElement> {
  ms: number;
}

export default function Duration({ ms, ...rest }: DurationProps) {
  const formatted = useMemo(() => formatDuration(ms, { leading: true }), [ms]);
  return <span {...rest}>{formatted}</span>;
}
