import styled from '@emotion/styled';
import defaults from './defaults';
import { styleFunction } from '../../../utils/with-sx-prop';
import { ContainerProps } from './types';

const styles = ({ theme, maxWidth = defaults.maxWidth }: ContainerProps) => `
  width: ${theme?.breakpoints[maxWidth]};
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
`;

const Container = styled.div<ContainerProps>(styles, styleFunction);

export { Container };
export default Container;
