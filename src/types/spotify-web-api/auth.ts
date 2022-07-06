export interface UserAuthParameter {
  client_id: string;
  response_type: 'code';
  redirect_uri: string;
  state?: string;
  scope?: string; // a space-separated list of scopes
  show_dialog?: boolean;
}

export interface UserAuthResponse {
  code: string;
  state: string;
}
