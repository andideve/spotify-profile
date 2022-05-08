import React from 'react';
import defaults, { transitionMs, buttonRadii } from './defaults';
import { BoxRing } from '../box-ring';
import { ButtonRingProps } from './types';

function ButtonRing(props: ButtonRingProps) {
  return <BoxRing transitionMs={transitionMs} radii={buttonRadii} {...props} />;
}

ButtonRing.defaultProps = {
  size: defaults.size,
};

export default ButtonRing;
