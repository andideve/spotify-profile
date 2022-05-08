const createMediaQuery = (n: string) => `@media screen and (min-width: ${n})`;

const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '976px',
  xl: '1440px',
};

const mediaQueries: Record<keyof typeof breakpoints, string> = {
  sm: createMediaQuery(breakpoints.sm),
  md: createMediaQuery(breakpoints.md),
  lg: createMediaQuery(breakpoints.lg),
  xl: createMediaQuery(breakpoints.xl),
};

const responsive = {
  breakpoints,
  mediaQueries,
};

export default responsive;
