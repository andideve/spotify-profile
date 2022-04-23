import { AuthScopes } from '../types/spotify';

export default function createScope(scopes: AuthScopes[]) {
  return Array.from(new Set(scopes)).join(' ');
}
