import React from 'react';

import AlbumList from '../../../templates/AlbumList';

import SectionHead from '../../../organisms/SectionHead';
import AlbumItem from '../../../organisms/AlbumItem';

import { SITE_PATHS } from '../../../../config/globals';

function PublicPlaylists() {
  return (
    <>
      <SectionHead title="Public Playlists" />
      <AlbumList>
        <AlbumItem
          link={SITE_PATHS.PLAYLIST('123')}
          title="Save"
          image={{ alt: '', src: 'https://github.com/andideve.png' }}
        />
      </AlbumList>
    </>
  );
}

export { PublicPlaylists as PublicPlaylistsSection };
export default PublicPlaylists;
