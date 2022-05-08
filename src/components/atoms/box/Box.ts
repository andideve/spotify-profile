import styled from '@emotion/styled';
import { styleFunction } from '../../../utils/with-sx-prop';
import { BoxProps } from './types';

const Box = styled.div<BoxProps>(styleFunction);

export { Box };
export default Box;
