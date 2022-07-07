import type { NextPage } from 'next';
import React, { useEffect, useMemo, useState } from 'react';

import Page, { SectionStack, HeroProps } from '../../containers/templates/Page';

import { sections, PageData } from '../../containers/pages/user-profile-sections';

import useUserData from '../../hooks/useUserData';

import { getProfileDesc } from '../../utils/heros';

import { API } from '../../services/api';

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PageData>({
    topArtists: { items: [], hasMore: false },
    topTracks: { items: [], hasMore: false },
    playlists: { items: [], hasMore: false },
    followedArtists: { items: [], hasMore: false },
  });

  const user = useUserData();

  const fetchData = async () => {
    const topArtists = await API.getMyTopArtists({ time_range: 'short_term', limit: 6 });
    const topTracks = await API.getMyTopTracks({ time_range: 'short_term', limit: 4 });
    const playlists = await API.getMyPlaylists({ limit: 6 });
    const followedArtists = await API.getMyFollowedArtists({ limit: 6 });

    const pageData: PageData = {
      topArtists: {
        items: topArtists.items,
        hasMore: topArtists.limit < topArtists.total,
      },
      topTracks: {
        items: topTracks.items,
        hasMore: topTracks.limit < topTracks.total,
      },
      playlists: {
        items: playlists.items.filter((e) => e.public),
        hasMore: false,
      },
      followedArtists: {
        items: followedArtists.artists.items,
        hasMore: false,
      },
    };

    return pageData;
  };

  useEffect(() => {
    (async () => {
      try {
        setData(await fetchData());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const description = useMemo(() => {
    const count = {
      playlists: data.playlists.items.length,
      followings: data.followedArtists.items.length,
    };
    return getProfileDesc({ publicPlaylists: count.playlists, followings: count.followings });
  }, [data.playlists.items.length, data.followedArtists.items.length]);

  function getHeroProps(): HeroProps | undefined {
    if (!user.uid) return undefined;
    return {
      type: 'profile',
      images: user.images,
      category: 'Profile',
      title: user.name,
      description,
    };
  }

  return (
    <Page title={user.name} hero={getHeroProps()} primaryColor={undefined}>
      {!loading && (
        <SectionStack>
          {sections.top.artists(data.topArtists)}
          {sections.top.tracks(data.topTracks, { table: { disableHead: true } })}
          {sections.playlists(data.playlists)}
          {sections.following(data.followedArtists)}
        </SectionStack>
      )}
    </Page>
  );
};

export default Home;
