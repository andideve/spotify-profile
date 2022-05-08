import styled from '@emotion/styled';
import defaults from './defaults';
import { styleFunction } from '../../../utils/with-sx-prop';
import { AspectRatioProps } from './types';

const styles = ({ ratio = defaults.ratio }: AspectRatioProps) => `
  position: relative;
  height: 0;
  padding-bottom: calc(100% / ${ratio});
  & > img,
  & > video,
  & > iframe {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AspectRatio = styled.div<AspectRatioProps>(styles, styleFunction);

export { AspectRatio };
export default AspectRatio;
