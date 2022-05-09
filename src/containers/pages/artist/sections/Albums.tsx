import React from 'react';

import AlbumList from '../../../templates/AlbumList';

import SectionHead from '../../../organisms/SectionHead';
import AlbumItem from '../../../organisms/AlbumItem';

import { SITE_PATHS } from '../../../../config/globals';

function Album() {
  return (
    <>
      <SectionHead title="Albums" />
      <AlbumList>
        <AlbumItem
          link={SITE_PATHS.ALBUM('123')}
          title="Solipsism 0.2"
          description={
            <>
              <time dateTime="2021">2021</time>
              &nbsp;• Album
            </>
          }
          image={{ alt: '', src: 'https://github.com/andideve.png' }}
        />
      </AlbumList>
    </>
  );
}

export { Album as AlbumSection };
export default Album;
