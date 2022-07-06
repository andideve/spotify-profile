import type { NextApiHandler } from 'next';
import qs from 'query-string';

import fetchJson from '../../../utils/fetch-json';

import { GEONAMES_USERNAME } from '../../../config/globals';

import {
  CountryCodeParameter,
  RequiredCountryCodeParameter,
  CountryCodeResponse,
} from '../../../types/geonames';
import { ErrorResponse } from '../../../types/api';

export type { RequiredCountryCodeParameter, CountryCodeResponse };

type Data = CountryCodeResponse;

const handler: NextApiHandler<Data | ErrorResponse> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404).json({ message: 'Not Found' });
    return;
  }

  const { lat, lng } = req.query as Partial<RequiredCountryCodeParameter>;

  if (!(typeof lat === 'string' && typeof lng === 'string')) {
    res.status(400).json({ message: 'Missing required parameter: lat or lng' });
    return;
  }

  try {
    const parameter: CountryCodeParameter = { username: GEONAMES_USERNAME, lat, lng };
    const data = await fetchJson<Data>(
      `http://api.geonames.org/countryCodeJSON?${qs.stringify(parameter)}`,
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: String(err) });
  }
};

export default handler;
