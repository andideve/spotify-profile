import responsive from './responsive';
import { colors } from './colors';
import typography from './typography';

const theme = {
  ...responsive,
  colors,
  ...typography,
};

export type Theme = typeof theme;

export { theme };
export default theme;
