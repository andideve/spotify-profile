import { ButtonOptions } from './types';

const defaults: Required<ButtonOptions> = {
  variant: 'outlined',
  size: 'lg',
};

export const transitionMs = 200;
export const buttonRadii = '999px';

export { defaults as buttonDefaults };
export default defaults;
