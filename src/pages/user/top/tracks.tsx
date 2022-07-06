import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

import Page from '../../../containers/templates/Page';
import { sections, PageData } from '../../../containers/pages/user-profile-sections';

import { API } from '../../../services/api';

const TopTracks: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PageData['topTracks']>({ items: [], hasMore: false });

  const fetchData = async () => {
    const topTracks = await API.getMyTopTracks({ time_range: 'short_term', limit: 50 });
    const pageData: PageData['topTracks'] = {
      items: topTracks.items,
      hasMore: false,
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

  return <Page>{!loading && sections.top.tracks(data)}</Page>;
};

export default TopTracks;
