import React from 'react';
import { TracksTable, TracksTableRow } from '../../../organisms/TracksTable';

function Tracks() {
  return (
    <>
      <h2 className="sr-only">tracks</h2>
      <TracksTable headSticky>
        <TracksTableRow number={1} title="Intro 1" artistName="Pamungkas" durationMs={1.01} />
      </TracksTable>
    </>
  );
}

export { Tracks as TracksSection };
export default Tracks;
