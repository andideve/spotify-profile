import React from 'react';

import AlbumList from '../../../templates/AlbumList';

import SectionHead from '../../../organisms/SectionHead';
import AlbumItem from '../../../organisms/AlbumItem';

import { SITE_PATHS } from '../../../../config/globals';
import { UserPlaylistsData } from '../../../../services/api';

interface PublicPlaylistsProps {
  items: UserPlaylistsData['items'];
  headingTag?: keyof JSX.IntrinsicElements;
}

function PublicPlaylists({ items, headingTag }: PublicPlaylistsProps) {
  return (
    <>
      <SectionHead title="Public Playlists" />
      <AlbumList>
        {items.map((playlist) => (
          <AlbumItem
            key={playlist.id}
            headingTag={headingTag}
            link={SITE_PATHS.PLAYLIST(playlist.id)}
            title={playlist.name}
            image={{ alt: playlist.name, src: playlist.images[0].url }}
          />
        ))}
      </AlbumList>
    </>
  );
}

PublicPlaylists.defaultProps = { headingTag: undefined };

export { PublicPlaylists as PublicPlaylistsSection };
export default PublicPlaylists;
