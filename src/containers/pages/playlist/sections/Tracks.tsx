import React from 'react';

import { TracksTable, TracksTableRow } from '../../../organisms/TracksTable';

import { PlaylistsData } from '../../../../services/api';

function Tracks({ items }: { items: PlaylistsData['tracks']['items'] }) {
  return (
    <>
      <h2 className="sr-only">tracks</h2>
      <TracksTable head={{ cellAddon: 'Album' }} headSticky>
        {items.map(({ track }, i) => {
          if (!track) return null;
          return (
            <TracksTableRow
              number={i + 1}
              image={{ alt: track.name, src: track.album.images[0].url }}
              title={track.name}
              artistName={track.artists[0].name}
              durationMs={track.duration_ms}
              cellAddon={track.album.name}
            />
          );
        })}
      </TracksTable>
    </>
  );
}

export { Tracks as TracksSection };
export default Tracks;
