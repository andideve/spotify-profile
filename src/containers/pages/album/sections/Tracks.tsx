import React from 'react';

import { TracksTable, TracksTableRow } from '../../../organisms/TracksTable';
import { SingleAlbumData } from '../../../../services/api';

function Tracks({ items }: { items: SingleAlbumData['tracks']['items'] }) {
  return (
    <>
      <h2 className="sr-only">tracks</h2>
      <TracksTable headSticky>
        {items.map((track, i) => (
          <TracksTableRow
            key={track.id}
            number={i + 1}
            title={track.name}
            artistId={track.artists[0].id}
            artistName={track.artists[0].name}
            durationMs={track.duration_ms}
          />
        ))}
      </TracksTable>
    </>
  );
}

export { Tracks as TracksSection };
export default Tracks;
