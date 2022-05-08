import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';

import Page from '../containers/templates/Page';

import API, { MeData } from '../services/api';

const User: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<MeData>();

  useEffect(() => {
    (async () => {
      try {
        setUser(await API.spotify.me());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || !user) return <Page />;

  return (
    <Page
      title={user.display_name}
      head={{
        category: 'Profile',
        title: user.display_name,
        image: { radii: '999px', url: user.images[0].url },
        stats: (
          <>
            <span>2 Public Playlists</span>
            <span>3 Following</span>
          </>
        ),
      }}
    />
  );
};

export default User;
