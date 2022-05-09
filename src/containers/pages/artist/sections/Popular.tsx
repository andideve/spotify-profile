import React from 'react';
import styled from '@emotion/styled';

import SectionHead from '../../../organisms/SectionHead';
import { TracksTable, TracksTableRow } from '../../../organisms/TracksTable';

import { Text } from '../../../../components/atoms/typography';

import useToggleMore from '../../../../hooks/useToggleMore';

import media from '../../../../utils/media';
import { StyledProps } from '../../../../types/styled';

const MoreButton = styled.button<StyledProps<HTMLButtonElement>>`
  text-transform: uppercase;
  padding: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.secondary.default};
  &:focus {
    color: ${({ theme }) => theme.colors.secondary.hovered};
  }
  ${media('lg')} {
    &:hover {
      color: ${({ theme }) => theme.colors.secondary.hovered};
    }
  }
`;

MoreButton.defaultProps = { type: 'button' };

interface PopularProps {
  items: unknown[];
}

function Popular({ items }: PopularProps) {
  const toggleMore = useToggleMore(items);
  return (
    <>
      <SectionHead title="Popular" />
      <TracksTable head={{ cellAddon: 'Listeners' }} disableHead>
        {toggleMore.list.map((val, i) => (
          <TracksTableRow
            key={i}
            number={i + 1}
            image={{ alt: '', src: 'https://github.com/andideve.png' }}
            title="To the Bone"
            artistName=""
            durationMs={5.44}
            cellAddon="196,439,189"
          />
        ))}
      </TracksTable>
      <MoreButton onClick={toggleMore.handler}>
        <Text size="xs">{toggleMore.more ? 'Show Less' : 'See More'}</Text>
      </MoreButton>
    </>
  );
}

export { Popular as PopularSection };
export default Popular;
