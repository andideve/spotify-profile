import styled from '@emotion/styled';
import styleFunctions from './styleFunctions';
import { ParagraphProps } from './types';

const Paragraph = styled.p<ParagraphProps>(...styleFunctions);

export { Paragraph };
export default Paragraph;
