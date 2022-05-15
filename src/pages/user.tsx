import type { NextPage } from 'next';
import Link from 'next/link';
import React, { useState, useEffect, useMemo } from 'react';

import Page from '../containers/templates/Page';
import Section from '../containers/templates/Section';

import {
  TopArtistsSection,
  TopTracksSection,
  PlaylistsSection,
  FollowingSection,
} from '../containers/pages/user/sections';

import { Container } from '../components/atoms/container';
import { Box } from '../components/atoms/box';

import API, {
  MeData,
  MyTopArtistsData,
  MyTopTracksData,
  UserPlaylistsData,
  MyFollowingArtistsData,
} from '../services/api';

import { afterLogin } from '../utils/on-login-logout';
import { SITE_PATHS } from '../config/globals';
import { UserID } from '../types/spotify';

const BaseSection = Box.withComponent('section');
const Anchor = Box.withComponent('a');

const User: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<MeData>();
  const [topArtists, setTopArtists] = useState<MyTopArtistsData>();
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
        afterLogin({ uid: userData.id });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

      setTopArtists(await API.spotify.me.top({ type: 'artists' }));
      setTopTracks(await API.spotify.me.top({ type: 'tracks' }));
      setPlaylists(await API.spotify.users.playlists({ user_id: uid }));
      setFollowedArtists(await API.spotify.me.following({ type: 'artist' }));
    })();
  }, []);

  if (loading || !user) return <Page />;

  const avatar = user.images?.[0];
  const publicPlaylistsTotal = publicPlaylists?.length || 0;
  const followedArtistsTotal = followedArtists?.artists.total || 0;

  return (
    <Page
      title={user.display_name}
      head={{
        category: 'Profile',
        title: user.display_name || '',
        image: avatar && { radii: '999px', src: avatar.url },
        stats: (
          <>
            <span>
              {publicPlaylistsTotal} Public Playlist{publicPlaylistsTotal > 1 ? 's' : ''}
            </span>
            <span>
              <Link href={SITE_PATHS.USER_FOLLOWING} passHref>
                <Anchor className="underlined">{followedArtistsTotal} Following</Anchor>
              </Link>
            </span>
          </>
        ),
      }}
    >
      {topArtists?.items.length ? (
        <BaseSection>
          <Container>
            <TopArtistsSection items={topArtists.items} max={6} />
          </Container>
        </BaseSection>
      ) : null}
      {topTracks?.items.length ? (
        <Section>
          <Container>
            <TopTracksSection items={topTracks.items} max={4} disableHead />
          </Container>
        </Section>
      ) : null}
      {publicPlaylists?.length ? (
        <Section>
          <Container>
            <PlaylistsSection title="Public Playlists" items={publicPlaylists} max={6} />
          </Container>
        </Section>
      ) : null}
      {followedArtists?.artists.items.length ? (
        <Section>
          <Container>
            <FollowingSection items={followedArtists.artists.items} max={6} />
          </Container>
        </Section>
      ) : null}
    </Page>
  );
};

export default User;
