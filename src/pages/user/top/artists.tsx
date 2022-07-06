import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

import Page from '../../../containers/templates/Page';
import { sections, PageData } from '../../../containers/pages/user-profile-sections';

import { API } from '../../../services/api';

const TopArtists: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PageData['topArtists']>({ items: [], hasMore: false });

  const fetchData = async () => {
    const topArtists = await API.getMyTopArtists({ time_range: 'short_term', limit: 10 });
    const pageData: PageData['topArtists'] = {
      items: topArtists.items,
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

  return <Page>{!loading && sections.top.artists(data)}</Page>;
};

export default TopArtists;
