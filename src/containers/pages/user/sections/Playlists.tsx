import React from 'react';

import AlbumList from '../../../templates/AlbumList';

import SectionHead from '../../../organisms/SectionHead';
import AlbumItem from '../../../organisms/AlbumItem';

import { SITE_PATHS } from '../../../../config/globals';
import { UserPlaylistsData } from '../../../../services/api';

interface PlaylistsProps {
  items: UserPlaylistsData['items'];
  title?: string;
  headingTag?: keyof JSX.IntrinsicElements;
}

function Playlists({ items, title = 'Playlists', headingTag }: PlaylistsProps) {
  return (
    <>
      <SectionHead title={title} />
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

Playlists.defaultProps = { title: undefined, headingTag: undefined };

export { Playlists as PlaylistsSection };
export default Playlists;
