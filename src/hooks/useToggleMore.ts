import { useCallback, useMemo, useState } from 'react';

const useToggleMore = <T = unknown>(items: T[], _initialMax?: number) => {
  const [more, setMore] = useState(false);

  const initialMax = useMemo(() => _initialMax || items.length / 2, [_initialMax, items.length]);
  const list = useMemo(() => (more ? items : items.slice(0, initialMax)), [more, items]);

  const handler = useCallback(() => setMore((s) => !s), []);

  return { handler, list, more } as const;
};

export default useToggleMore;
