import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import Page from '../containers/templates/Page';
import Section from '../containers/templates/Section';

import {
  PopularSection,
  PopularReleasesSection,
  AlbumSection,
} from '../containers/pages/artist/sections';

import { Container } from '../components/atoms/container';
import { Box } from '../components/atoms/box';

import API, { SingleArtistData, ArtistTopTracksData, ArtistAlbumsData } from '../services/api';

import geolocationAsync from '../utils/geolocation-async';
import { SITE_PATHS } from '../config/globals';

const BaseSection = Box.withComponent('section');

type ArtistTopTrack = ArtistTopTracksData['tracks'][0];

function getPopularReleases(tracks: ArtistTopTrack[] = []): ArtistTopTrack['album'][] {
  const obj: Record<ArtistTopTrack['album']['id'], ArtistTopTrack> = {};
  tracks.forEach((track) => {
    obj[track.album.id] = track;
  });

  return Object.values(obj).map((track) => track.album);
}

const Artist: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState<SingleArtistData>();
  const [topTracks, setTopTracks] = useState<ArtistTopTracksData>();
  const [albums, setAlbums] = useState<ArtistAlbumsData>();

  const router = useRouter();

  const popularReleases = useMemo(() => getPopularReleases(topTracks?.tracks), [topTracks]);

  useEffect(() => {
    if (!router.isReady) return;

    const { id } = router.query;

    if (typeof id !== 'string') {
      router.push(SITE_PATHS.USER_DASHBOARD);
      return;
    }

    (async () => {
      try {
        setArtist(await API.spotify.artists.single({ id }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

      if ('geolocation' in window.navigator) {
        const { coords } = await geolocationAsync.getCurrentPosition();
        const { countryCode } = await API.geonames.countryCode({
          lat: coords.latitude,
          lng: coords.longitude,
        });
        setTopTracks(await API.spotify.artists.topTracks({ country: countryCode, artist_id: id }));
      }

      setAlbums(await API.spotify.artists.albums({ artist_id: id }));
    })();
  }, [router.isReady]);

  // TODO
  if (loading || !artist) return <Page />;

  return (
    <Page
      title={artist.name}
      head={{
        title: artist.name,
        stats: <span>{artist.popularity}% popularity</span>,
      }}
    >
      {topTracks?.tracks.length ? (
        <BaseSection>
          <Container>
            <PopularSection items={topTracks.tracks} />
          </Container>
        </BaseSection>
      ) : null}
      {popularReleases.length ? (
        <Section>
          <Container>
            <PopularReleasesSection items={popularReleases} />
          </Container>
        </Section>
      ) : null}
      {albums?.items.length ? (
        <Section>
          <Container>
            <AlbumSection items={albums.items} />
          </Container>
        </Section>
      ) : null}
    </Page>
  );
};

export default Artist;

