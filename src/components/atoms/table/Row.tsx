import React, { useMemo } from 'react';
import styled from '@emotion/styled';

import media from '../../../utils/media';
import { styleFunction } from '../../../utils/with-sx-prop';

import { TableRowProps } from './types';

const styles = ({ theme, cols }: TableRowProps) => `
  display: grid;
  column-gap: 1rem;
  grid-template-columns: repeat(${cols}, 1fr);
  padding-right: 0.25rem;
  padding-left: 0.25rem;
  border-radius: 0.25rem;
  ${media('lg')} {
    padding-right: 1rem;
    padding-left: 1rem;
  }
  thead > & {
    padding-top: 0.525rem;
    padding-bottom: 0.525rem;
    border-bottom: 1px solid ${theme?.colors.border.default};
  }
  tbody & {
    padding-top: 0.425rem;
    padding-bottom: 0.425rem;
  }
  th {
    margin-top: auto;
    margin-bottom: auto;
    // head typography
    text-transform: uppercase;
    font-size: ${theme?.fontSizes.xs};
    line-height: ${theme?.lineHeights.xs};
    font-weight: 500;
    color: ${theme?.colors.secondary.default};
  }
  th, td {
    text-align: inherit;
  }
`;

const BaseTableRow = styled.tr<TableRowProps>(styles, styleFunction);

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, cols: _cols, ...rest }, ref) => {
    const cols = useMemo(() => _cols || React.Children.toArray(children).length, [_cols, children]);
    return (
      <BaseTableRow ref={ref} cols={cols} {...rest}>
        {children}
      </BaseTableRow>
    );
  },
);

TableRow.defaultProps = { cols: undefined };

export { TableRow };
export default TableRow;
