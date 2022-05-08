import styled from '@emotion/styled';

import { styleFunction } from '../../../utils/with-sx-prop';
import media from '../../../utils/media';
import { GridContainerProps } from './types';

const styles = `
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 1rem;
  ${media('md')} {
    grid-template-columns: repeat(8, minmax(0, 1fr));
    column-gap: 1.5rem;
  }
  ${media('lg')} {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
`;

const GridContainer = styled.div<GridContainerProps>(styles, styleFunction);

export { GridContainer };
export default GridContainer;
