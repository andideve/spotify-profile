import React from 'react';
import styled from '@emotion/styled';

import Ring from './Ring';
import styleFunctions from './styleFunctions';
import defaults from './defaults';
import { ButtonProps } from './types';

const ButtonBase = styled.button<ButtonProps>(...styleFunctions);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, size = defaults.size, disabled, ...rest }, ref) => (
    <ButtonBase ref={ref} size={size} disabled={disabled} {...rest}>
      {children}
      {!disabled && <Ring size={size} />}
    </ButtonBase>
  ),
);

export { Button };
export default Button;
