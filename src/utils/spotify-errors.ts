import { SpotifyError } from '../types/spotify';

const spotifyErrors = {
  missingParameter(parameter: string): SpotifyError {
    return {
      error: {
        status: 400,
        message: `Missing required parameter: ${parameter}`,
      },
    };
  },

  invalidParameter(parameter: string): SpotifyError {
    return {
      error: {
        status: 400,
        message: `Invalid parameter: ${parameter}`,
      },
    };
  },

  notFound(): SpotifyError {
    return {
      error: {
        status: 404,
        message: 'Not Found',
      },
    };
  },
};

export default spotifyErrors;
