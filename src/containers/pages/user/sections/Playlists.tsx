import React, { useMemo } from 'react';

import AlbumList from '../../../templates/AlbumList';

import SectionHead from '../../../organisms/SectionHead';
import AlbumItem from '../../../organisms/AlbumItem';

import { SITE_PATHS } from '../../../../config/globals';
import { UserPlaylistsData } from '../../../../services/api';

interface PlaylistsProps {
  items: UserPlaylistsData['items'];
  title?: string;
  headingTag?: keyof JSX.IntrinsicElements;
  max?: number;
}

function Playlists({ items, title = 'Playlists', headingTag, max }: PlaylistsProps) {
  const list = useMemo(() => (max ? items.slice(0, max) : items), [items, max]);
  return (
    <>
      <SectionHead
        title={title}
        arrowLink={
          items.length > list.length
            ? { to: SITE_PATHS.USER_PLAYLISTS, label: 'See all' }
            : undefined
        }
      />
      <AlbumList>
        {items.map((playlist) => {
          const { images } = playlist;
          return (
            <AlbumItem
              key={playlist.id}
              headingTag={headingTag}
              link={SITE_PATHS.PLAYLIST(playlist.id)}
              title={playlist.name}
              image={{
                as: 'picture',
                children: (
                  <>
                    {images.map((image, i) => (
                      <source key={i} srcSet={image.url} media={`(min-width: ${image.width}px)`} />
                    ))}
                    <img alt={playlist.name} src={images[images.length - 1].url} />
                  </>
                ),
              }}
            />
          );
        })}
      </AlbumList>
    </>
  );
}

Playlists.defaultProps = { title: undefined, headingTag: undefined, max: undefined };

export { Playlists as PlaylistsSection };
export default Playlists;
