import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';

import useLogout from '../hooks/useLogout';

import API from '../services/api';

const User: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');

  const logout = useLogout();

  useEffect(() => {
    (async () => {
      try {
        const user = await API.spotify.me();
        setName(user.display_name);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main style={{ maxWidth: 576, margin: '0 auto' }}>
      <h1>Profile</h1>
      {loading ? <p>Loading...</p> : <p>Name: {name}</p>}
      <div style={{ marginTop: '1rem' }}>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </main>
  );
};

export default User;
