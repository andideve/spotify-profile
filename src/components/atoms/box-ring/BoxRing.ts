import styled from '@emotion/styled';
import { CSSObject } from '@emotion/serialize';

import defaults from './defaults';
import { styleFunction } from '../../../utils/with-sx-prop';
import createTransitions from '../../../utils/transition';
import media from '../../../utils/media';
import { BoxRingProps, BoxRingSizes } from './types';

const baseStyles = ({ transitionMs: tms = defaults.transitionMs }: BoxRingProps) => `
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: ${createTransitions(['opacity'], {
    ms: tms,
    tFn: 'cubic-bezier(0.4, 0, 0.2, 1)',
  })};
`;

const getSize = ({
  theme,
  size,
  radii: _radii = defaults.radii,
  borderColor: _borderColor,
}: BoxRingProps): CSSObject => {
  const radii = typeof _radii === 'number' ? `${_radii}px` : _radii;
  const borderColor = _borderColor || theme?.colors.white;

  const innerSpaces: Record<BoxRingSizes, number> = { xs: 2, lg: 4 };
  const borderWidths: Record<BoxRingSizes, number> = { xs: 1.5, lg: 1.5 };

  const innerSpace = innerSpaces[size];
  const borderWidth = borderWidths[size];

  const initial: CSSObject = { opacity: 0 };
  const visible: CSSObject = { opacity: 1 };

  const visibleSelectors = {
    _: [
      'label:active ~ &, label:focus ~ &', // label
      'a:active &, a:focus &', // anchor
      'button:active &, button:focus &', // button
      'input:active ~ &, input:focus ~ &', // input
      'textarea:active ~ &, textarea:focus ~ &', // textarea
    ],
    md: [
      'label:hover ~ &', // label
      'a:hover &', // anchor
      'button:hover &', // button
      'input:hover ~ &', // input
      'textarea:hover ~ &', // textarea
    ],
  };

  return {
    ...initial,
    borderRadius: radii,
    boxShadow: `0 0 0 ${innerSpace}px ${theme?.colors.body.background}, 0 0 0 calc(${borderWidth}px + ${innerSpace}px) ${borderColor}`,
    [`*:active > &, *:focus > &, ${visibleSelectors._.join(',')}`]: visible,
    [media('md')]: {
      [`&:hover, ${visibleSelectors.md.join(',')}`]: visible,
    },
  };
};

const BoxRing = styled.span<BoxRingProps>(baseStyles, getSize, styleFunction);

export { BoxRing };
export default BoxRing;
