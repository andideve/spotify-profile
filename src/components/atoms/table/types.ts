import React from 'react';
import { StyledProps } from '../../../types/styled';
import { StyleFunctionProps } from '../../../utils/with-sx-prop/types';

export type TableProps = StyledProps<HTMLTableElement> &
  StyleFunctionProps<StyledProps['theme']> &
  React.TableHTMLAttributes<HTMLTableElement>;

export interface TableRowProps
  extends StyledProps<HTMLTableRowElement>,
    StyleFunctionProps<StyledProps['theme']>,
    React.HTMLAttributes<HTMLTableRowElement> {
  cols?: number;
}
