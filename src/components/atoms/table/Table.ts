import styled from '@emotion/styled';

import { styleFunction } from '../../../utils/with-sx-prop';
import { TableProps } from './types';

const styles = `
  width: 100%;
  tbody > tr:first-of-type {
    margin-top: 0.875rem;
  }
`;

const Table = styled.table<TableProps>(styles, styleFunction);

export { Table };
export default Table;
