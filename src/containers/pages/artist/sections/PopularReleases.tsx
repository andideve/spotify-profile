import React from 'react';

import AlbumList from '../../../templates/AlbumList';

import SectionHead from '../../../organisms/SectionHead';
import AlbumItem from '../../../organisms/AlbumItem';

import { SITE_PATHS } from '../../../../config/globals';

function PopularReleases() {
  return (
    <>
      <SectionHead title="Popular Releases" />
      <AlbumList>
        <AlbumItem
          link={SITE_PATHS.ALBUM('123')}
          title="Happy Birthday To You"
          description={
            <>
              <time dateTime="2022">Latest Release</time>
              &nbsp;• Single
            </>
          }
          image={{ alt: '', src: 'https://github.com/andideve.png' }}
        />
      </AlbumList>
    </>
  );
}

export { PopularReleases as PopularReleasesSection };
export default PopularReleases;
