import type { NextApiHandler } from 'next';

import Geonames, {
  RequiredCountryCodeParameter,
  CountryCodeResponse,
} from '../../../services/geonames';
import { GeonamesError } from '../../../types/geonames';

export type { RequiredCountryCodeParameter };

export type CountryCodeParameter = RequiredCountryCodeParameter;
export type CountryCodeData = CountryCodeResponse;
export type CountryCodeError = GeonamesError;

const handler: NextApiHandler<CountryCodeData | CountryCodeError> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404);
    return;
  }

  const query = req.query as Partial<CountryCodeParameter>;

  if (!(typeof query.lat === 'string' && typeof query.lng === 'string')) {
    res.status(400).json({
      message: 'Provide `lat` and `lng` as query parameter',
    });
    return;
  }

  try {
    const response = await Geonames.countryCode({ lat: query.lat, lng: query.lng });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Error happened' });
  }
};

export default handler;
