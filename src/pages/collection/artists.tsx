import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Page from '../../containers/templates/Page';

import { FollowingSection } from '../../containers/pages/user/sections/Following';

import API, { MyFollowingArtistsData } from '../../services/api';

import getCurrentUid from '../../utils/get-current-uid';
import { COLLECTION_TOP_NAVS, SITE_PATHS } from '../../config/globals';

const Artists: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [followedArtists, setFollowedArtists] = useState<MyFollowingArtistsData>();

  const router = useRouter();

  useEffect(() => {
    const uid = getCurrentUid();

    if (!uid) {
      router.push(SITE_PATHS.USER_DASHBOARD);
      return;
    }

    (async () => {
      try {
        setFollowedArtists(await API.spotify.me.following({ type: 'artist' }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Page title="Your Library" topnavs={COLLECTION_TOP_NAVS} />;

  return (
    <Page title="Your Library" topnavs={COLLECTION_TOP_NAVS}>
      <FollowingSection title="Artists" items={followedArtists?.artists.items || []} />
    </Page>
  );
};

export default Artists;
