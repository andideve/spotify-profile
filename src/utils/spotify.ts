import { AuthScopes } from '../types/spotify-web-api/scopes';

export const createScope = (scopes: AuthScopes[]) => Array.from(new Set(scopes)).join(' ');
