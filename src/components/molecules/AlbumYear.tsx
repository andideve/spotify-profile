import React, { useMemo } from 'react';

export default function AlbumYear({ date }: { date: string }) {
  const year = useMemo(() => new Date(date).getFullYear(), [date]);
  return <time dateTime={date}>{year}</time>;
}
