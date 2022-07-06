import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

import Page, { Section } from '../../../containers/templates/Page';

import SpotifyCard, { SpotifyCardList } from '../../../containers/organisms/spotify-card';

import SectionHead from '../../../components/molecules/section-head';

import { SITE_PATHS } from '../../../config/globals';

import { libraryMenu } from '../../../_data/app/site-menu';

import { API, MySavedAlbumsResponse } from '../../../services/api';

const Albums: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState<MySavedAlbumsResponse['items']>([]);

  const fetchData = async () => API.getMySavedAlbums().then((v) => v.items);

  useEffect(() => {
    (async () => {
      try {
        setAlbums(await fetchData());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Page title="Albums" menuItems={libraryMenu}>
      {!loading && (
        <Section>
          <SectionHead title="Albums" />
          <SpotifyCardList as="ul">
            {albums.map(({ album }) => (
              <SpotifyCard
                as="li"
                key={album.id}
                link={SITE_PATHS.ALBUM(album.id)}
                type="album"
                images={album.images}
                title={album.name}
                description={album.artists[0].name}
              />
            ))}
          </SpotifyCardList>
        </Section>
      )}
    </Page>
  );
};

export default Albums;
