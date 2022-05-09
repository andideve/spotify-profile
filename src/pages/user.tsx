import type { NextPage } from 'next';
import Link from 'next/link';
import React, { useState, useEffect, useMemo } from 'react';

import Page from '../containers/templates/Page';
import Section from '../containers/templates/Section';

import {
  TopTracksSection,
  PublicPlaylistsSection,
  FollowingSection,
} from '../containers/pages/user/sections';

import { Box } from '../components/atoms/box';

import API, {
  MeData,
  MyTopTracksData,
  UserPlaylistsData,
  MyFollowingArtistsData,
} from '../services/api';

import { SITE_PATHS } from '../config/globals';
import { UserID } from '../types/spotify';

const BaseSection = Box.withComponent('section');
const Anchor = Box.withComponent('a');

const User: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<MeData>();
  const [topTracks, setTopTracks] = useState<MyTopTracksData>();
  const [playlists, setPlaylists] = useState<UserPlaylistsData>();
  const [followedArtists, setFollowedArtists] = useState<MyFollowingArtistsData>();

  const publicPlaylists = useMemo(
    () => playlists?.items.filter((playlist) => playlist.public),
    [playlists],
  );

  useEffect(() => {
    (async () => {
      let uid: UserID = '';

      try {
        const userData = await API.spotify.getMe();
        setUser(userData);

        uid = userData.id;
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

      setTopTracks(await API.spotify.me.top({ type: 'tracks' }));
      setPlaylists(await API.spotify.users.playlists({ user_id: uid }));
      setFollowedArtists(await API.spotify.me.following({ type: 'artist' }));
    })();
  }, []);

  if (loading || !user) return <Page />;

  const avatar = user.images?.[0];

  return (
    <Page
      title={user.display_name}
      head={{
        category: 'Profile',
        title: user.display_name || '',
        image: avatar && { radii: '999px', url: avatar.url },
        stats: (
          <>
            <span>2 Public Playlists</span>
            <span>
              <Link href={SITE_PATHS.USER_FOLLOWING} passHref>
                <Anchor className="underlined">3 Following</Anchor>
              </Link>
            </span>
          </>
        ),
      }}
    >
      {topTracks?.items.length ? (
        <BaseSection>
          <TopTracksSection items={topTracks.items} max={4} disableHead />
        </BaseSection>
      ) : null}
      {publicPlaylists?.length ? (
        <Section>
          <PublicPlaylistsSection items={publicPlaylists} />
        </Section>
      ) : null}
      {followedArtists?.artists.items.length ? (
        <Section>
          <FollowingSection items={followedArtists.artists.items} />
        </Section>
      ) : null}
    </Page>
  );
};

export default User;
