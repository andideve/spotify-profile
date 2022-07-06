import { format } from 'date-fns';

export function formatDateAdded(date: string) {
  return format(new Date(date), 'MMM d, y');
}
