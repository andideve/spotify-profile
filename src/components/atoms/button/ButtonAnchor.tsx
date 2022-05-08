import React from 'react';
import styled from '@emotion/styled';

import Ring from './Ring';
import styleFunctions from './styleFunctions';
import cssReset from './anchor-css-reset';
import defaults from './defaults';
import { ButtonAnchorProps } from './types';

const Anchor = styled.a<ButtonAnchorProps>(...styleFunctions, cssReset);

const ButtonAnchor = React.forwardRef<HTMLAnchorElement, ButtonAnchorProps>(
  ({ children, size = defaults.size, external, ...rest }, ref) => (
    <Anchor
      ref={ref}
      size={size}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
      <Ring size={size} />
    </Anchor>
  ),
);

export { ButtonAnchor };
export default ButtonAnchor;
