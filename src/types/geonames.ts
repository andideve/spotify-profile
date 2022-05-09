export interface GeonamesError {
  message: string;
}

export interface GeonamesAuthParameter {
  username: string;
}

export interface RequiredCountryCodeParameter {
  lat: number;
  lng: number;
}

export type CountryCodeParameter = RequiredCountryCodeParameter & GeonamesAuthParameter;

export interface CountryCodeResponse {
  countryCode: string;
  countryName: string;
  distance: string;
  languages: string; // a string separated with ","
}
