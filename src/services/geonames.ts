// https://www.geonames.org/export/ws-overview.html
import qs from 'query-string';

import {
  CountryCodeParameter,
  RequiredCountryCodeParameter,
  CountryCodeResponse,
} from '../types/geonames';

export type { CountryCodeParameter, RequiredCountryCodeParameter, CountryCodeResponse };

const username = process.env.GEONAMES_USERNAME || '';

async function countryCode(parameter: RequiredCountryCodeParameter) {
  const allParameter: CountryCodeParameter = { username, ...parameter };
  return fetch(`http://api.geonames.org/countryCodeJSON?${qs.stringify(allParameter)}`).then(
    (res) => res.json() as Promise<CountryCodeResponse>,
  );
}

const Geonames = { countryCode };

export default Geonames;
