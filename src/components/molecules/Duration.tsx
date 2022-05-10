import React, { useMemo } from 'react';
import formatDuration from 'format-duration';

export default function Duration({ ms }: { ms: number }) {
  const formatted = useMemo(() => formatDuration(ms), [ms]);
  return <span>{formatted}</span>;
}
