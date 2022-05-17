import React, { useMemo } from 'react';

import SectionHead from '../../../organisms/SectionHead';
import {
  TracksTable,
  TracksTablePropsOptions,
  TracksTableRow,
  DataLink,
} from '../../../organisms/TracksTable';

import { MyTopTracksData } from '../../../../services/api';
import { SITE_PATHS } from '../../../../config/globals';

interface TopTracksProps extends TracksTablePropsOptions {
  items: MyTopTracksData['items'];
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
        {list.map((track, i) => {
          const { images } = track.album;
          return (
            <TracksTableRow
              key={track.id}
              number={i + 1}
              title={track.name}
              artistId={track.artists[0].id}
              artistName={track.artists[0].name}
              durationMs={track.duration_ms}
              cellAddon={
                <DataLink to={SITE_PATHS.ALBUM(track.album.id)}>{track.album.name}</DataLink>
              }
              image={{
                as: 'picture',
                children: (
                  <>
                    {images.map((image, imageIndex) => (
                      <source
                        key={imageIndex}
                        srcSet={image.url}
                        media={`(min-width: ${image.width}px)`}
                      />
                    ))}
                    <img alt={track.name} src={images[images.length - 1].url} />
                  </>
                ),
              }}
            />
          );
        })}
      </TracksTable>
    </>
  );
}

TopTracks.defaultProps = { headingTag: undefined, max: undefined };

export { TopTracks as TopTracksSection };
export default TopTracks;
