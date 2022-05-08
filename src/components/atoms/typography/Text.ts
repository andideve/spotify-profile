import styled from '@emotion/styled';
import styleFunctions from './styleFunctions';
import { TextProps } from './types';

const Text = styled.span<TextProps>(...styleFunctions);

export { Text };
export default Text;
