import React from 'react';
import { TracksTable, TracksTableRow } from '../../../organisms/TracksTable';

function Tracks() {
  return (
    <>
      <h2 className="sr-only">tracks</h2>
      <TracksTable head={{ cellAddon: 'Album' }} headSticky>
        <TracksTableRow
          number={1}
          image={{ alt: '', src: 'https://github.com/andideve.png' }}
          title="Puisi Alam"
          artistName="Fourtwnty"
          durationMs={5.53}
          cellAddon="Unknown"
        />
      </TracksTable>
    </>
  );
}

export { Tracks as TracksSection };
export default Tracks;
