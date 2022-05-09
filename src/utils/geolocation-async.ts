/* eslint-disable no-undef */
const geolocationAsync = {
  async getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  },
};

export default geolocationAsync;
