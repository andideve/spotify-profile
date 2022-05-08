import responsive from '../theme/responsive';

export default function media(size: keyof typeof responsive['mediaQueries']) {
  return responsive.mediaQueries[size];
}
