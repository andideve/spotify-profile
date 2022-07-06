import React from 'react';

import { Section } from '../../templates/Page';

import SpotifyCard, { SpotifyCardList } from '../../organisms/spotify-card';
import { TracksTable, TracksTableRow } from '../../organisms/tables/tracks';

import SectionHead from '../../../components/molecules/section-head';

import { SITE_PATHS } from '../../../config/globals';

import type {
  MyTopArtistsResponse,
  MyTopTracksResponse,
  CurrentUserPlaylistsResponse,
  MyFollowedArtistsResponse,
} from '../../../services/api';

export interface PageData {
  topArtists: { items: MyTopArtistsResponse['items']; hasMore: boolean };
  topTracks: { items: MyTopTracksResponse['items']; hasMore: boolean };
  playlists: { items: CurrentUserPlaylistsResponse['items']; hasMore: boolean };
  followedArtists: { items: MyFollowedArtistsResponse['artists']['items']; hasMore: boolean };
}

export const sections = {
  top: {
    artists: ({ items, hasMore }: PageData['topArtists']) => (
      <Section>
        <SectionHead
          title="Top artists this month"
          description="Only visible to you"
          arrow={hasMore ? { label: 'See all', to: SITE_PATHS.TOP_ARTISTS } : undefined}
        />
        <SpotifyCardList as="ul">
          {items.map((topArtist) => (
            <SpotifyCard
              key={topArtist.id}
              as="li"
              link={SITE_PATHS.ARTIST(topArtist.id)}
              type="artist"
              images={topArtist.images}
              title={topArtist.name}
              description="Artist"
            />
          ))}
        </SpotifyCardList>
      </Section>
    ),
    tracks: (
      { items, hasMore }: PageData['topTracks'],
      options: { table?: { disableHead?: true } } = {},
    ) => (
      <Section>
        <SectionHead
          title="Top tracks this month"
          description="Only visible to you"
          arrow={hasMore ? { label: 'See all', to: SITE_PATHS.TOP_TRACKS } : undefined}
        />
        <TracksTable cols={['Album']} disableHead={options?.table?.disableHead}>
          {items.map((topTrack, i) => (
            <TracksTableRow
              key={topTrack.id}
              number={i + 1}
              images={topTrack.album.images}
              title={topTrack.name}
              artist={topTrack.artists[0]?.name}
              duration={topTrack.duration_ms}
              cols={[topTrack.album.name]}
            />
          ))}
        </TracksTable>
      </Section>
    ),
  },
  playlists: ({ items }: PageData['playlists']) => (
    <Section>
      <SectionHead title="Public Playlists" />
      <SpotifyCardList as="ul">
        {items.map((playlist) => (
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
  ),
  following: ({ items }: PageData['followedArtists']) => (
    <Section>
      <SectionHead title="Following" />
      <SpotifyCardList as="ul">
        {items.map((followedArtist) => (
          <SpotifyCard
            key={followedArtist.id}
            as="li"
            link={SITE_PATHS.ARTIST(followedArtist.id)}
            type="artist"
            images={followedArtist.images}
            title={followedArtist.name}
            description="Profile"
          />
        ))}
      </SpotifyCardList>
    </Section>
  ),
};
