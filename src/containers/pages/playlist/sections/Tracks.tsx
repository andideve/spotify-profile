import React from 'react';

import { TracksTable, TracksTableRow, DataLink } from '../../../organisms/TracksTable';

import { PlaylistsData } from '../../../../services/api';
import { SITE_PATHS } from '../../../../config/globals';

function Tracks({ items }: { items: PlaylistsData['tracks']['items'] }) {
  return (
    <>
      <h2 className="sr-only">tracks</h2>
      <TracksTable head={{ cellAddon: 'Album' }} headSticky>
        {items.map(({ track }, i) => {
          if (!track) return null;
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

export { Tracks as TracksSection };
export default Tracks;
