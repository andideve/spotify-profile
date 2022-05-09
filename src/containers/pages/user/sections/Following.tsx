import React from 'react';

import AlbumList from '../../../templates/AlbumList';

import SectionHead from '../../../organisms/SectionHead';
import AlbumItem from '../../../organisms/AlbumItem';

import { SITE_PATHS } from '../../../../config/globals';

function Following() {
  return (
    <>
      <SectionHead title="Following" />
      <AlbumList>
        <AlbumItem
          link={SITE_PATHS.ARTIST('123')}
          title="Pamungkas"
          description="Profile"
          image={{ alt: '', src: 'https://github.com/andideve.png' }}
        />
      </AlbumList>
    </>
  );
}

export { Following as FollowingSection };
export default Following;
