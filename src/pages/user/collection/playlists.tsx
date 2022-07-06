import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

import Page, { Section } from '../../../containers/templates/Page';

import SpotifyCard, { SpotifyCardList } from '../../../containers/organisms/spotify-card';

import SectionHead from '../../../components/molecules/section-head';

import { SITE_PATHS } from '../../../config/globals';

import { libraryMenu } from '../../../_data/app/site-menu';

import { API, CurrentUserPlaylistsResponse } from '../../../services/api';

const Playlists: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState<CurrentUserPlaylistsResponse['items']>([]);

  const fetchData = async () => API.getMyPlaylists().then((v) => v.items);

  useEffect(() => {
    (async () => {
      try {
        setPlaylists(await fetchData());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Page title="Playlists" menuItems={libraryMenu}>
      {!loading && (
        <Section>
          <SectionHead title="Playlists" />
          <SpotifyCardList as="ul">
            {playlists.map((playlist) => (
              <SpotifyCard
                key={playlist.id}
                as="li"
                link={SITE_PATHS.PLAYLIST(playlist.id)}
                type="playlist"
                images={playlist.images}
                title={playlist.name}
              />
            ))}
          </SpotifyCardList>
        </Section>
      )}
    </Page>
  );
};

export default Playlists;
