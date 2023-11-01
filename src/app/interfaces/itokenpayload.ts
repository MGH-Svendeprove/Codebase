export interface Itokenpayload {
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  iat?: number | undefined;
  iss?: string | undefined;
  jti?: string | undefined;
  nbf?: number | undefined;
  sub?: string | undefined;

  account_id?: number | undefined;
  role?: string | undefined;
  role_id?: number | undefined;
}
