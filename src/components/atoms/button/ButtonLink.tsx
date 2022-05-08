import Link from 'next/link';
import React from 'react';
import styled from '@emotion/styled';

import Ring from './Ring';
import styleFunctions from './styleFunctions';
import cssReset from './anchor-css-reset';
import defaults from './defaults';
import { ButtonLinkProps } from './types';

const Anchor = styled.a<ButtonLinkProps>(...styleFunctions, cssReset);

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ children, href, size = defaults.size, ...rest }, ref) => (
    <Link href={href} passHref>
      <Anchor ref={ref} href={href} size={size} {...rest}>
        {children}
        <Ring size={size} />
      </Anchor>
    </Link>
  ),
);

export { ButtonLink };
export default ButtonLink;
