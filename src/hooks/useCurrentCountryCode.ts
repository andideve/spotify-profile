import { useEffect, useState } from 'react';

import { API } from '../services/api';
import geolocationAsync from '../utils/geolocation-async';

const useCurrentCountryCode = () => {
  const [countryCode, setCountryCode] = useState('');

  useEffect(() => {
    (async () => {
      let arg = { latitude: 0, longitude: 0 };

      try {
        const {
          coords: { latitude, longitude },
        } = await geolocationAsync.getCurrentPosition();
        arg = { latitude, longitude };
      } catch (err) {
        // eslint-disable-next-line no-undef
        const geoPosError = err as GeolocationPositionError;
        console.error(geoPosError.message);
      }

      try {
        const res = await API.getCountryCode({ lat: arg.latitude, lng: arg.longitude });
        setCountryCode(res.countryCode);
      } catch (err) {
        console.error('Failed to get countryCode local api', err);
      }
    })();
  }, []);

  return countryCode;
};

export default useCurrentCountryCode;
