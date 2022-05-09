import React, { useMemo } from 'react';

import SectionHead from '../../../organisms/SectionHead';
import {
  TracksTable,
  TracksTablePropsOptions,
  TracksTableRow,
} from '../../../organisms/TracksTable';

import { SITE_PATHS } from '../../../../config/globals';

interface TopTracksProps extends TracksTablePropsOptions {
  items: unknown[];
  headingTag?: keyof JSX.IntrinsicElements;
  max?: number;
}

function TopTracks({ items, headingTag, max, ...options }: TopTracksProps) {
  const list = useMemo(() => (max ? items.slice(0, max) : items), [items, max]);
  return (
    <>
      <SectionHead
        headingTag={headingTag}
        title="Top tracks this month"
        description="Only visible to you"
        arrowLink={
          items.length > list.length
            ? { to: SITE_PATHS.USER_TOP_TRACKS, label: 'See all' }
            : undefined
        }
      />
      <TracksTable head={{ cellAddon: 'Album' }} {...options}>
        {list.map((val, i) => (
          <TracksTableRow
            key={i}
            number={i + 1}
            image={{ alt: '', src: 'https://github.com/andideve.png' }}
            title="Puisi Alam"
            artistName="Fourtwnty"
            durationMs={5.53}
            cellAddon="Unknown"
          />
        ))}
      </TracksTable>
    </>
  );
}

TopTracks.defaultProps = { headingTag: undefined, max: undefined };

export { TopTracks as TopTracksSection };
export default TopTracks;
