import { BoxRingOptions } from './types';

const defaults: Required<BoxRingOptions> = {
  radii: '.5rem',
  transitionMs: 200,
  borderColor: null, // FIXME?
};

export { defaults as boxRingDefaults };
export default defaults;
