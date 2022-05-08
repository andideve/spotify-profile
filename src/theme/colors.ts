const white = 'hsl(0, 0%, 100%)';
const black = 'hsl(260deg, 33%, 2%)';

const colors = {
  white,
  black,
  border: {
    default: 'hsl(0, 0%, 16%)',
    hovered: 'hsl(0, 0%, 100%)',
  },
  primary: {
    default: 'hsl(141deg, 76%, 48%)',
    contrast: black,
  },
  secondary: {
    default: 'hsl(0, 0%, 65%)',
    hovered: 'hsl(0, 0%, 100%)',
    contrast: black,
  },
  card: {
    default: 'hsl(0, 0%, 9%)',
    hovered: 'hsl(0, 0%, 16%)',
  },
  body: {
    text: white,
    background: 'hsl(0, 0%, 7%)',
  },
  navbar: {
    text: white,
    background: black,
  },
};

export { colors };
