import React from 'react';

import AlbumList from '../../../templates/AlbumList';

import SectionHead from '../../../organisms/SectionHead';
import AlbumItem from '../../../organisms/AlbumItem';

import { SITE_PATHS } from '../../../../config/globals';

function Following({ headingTag }: { headingTag?: keyof JSX.IntrinsicElements }) {
  return (
    <>
      <SectionHead headingTag={headingTag} title="Following" />
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

Following.defaultProps = { headingTag: undefined };

export { Following as FollowingSection };
export default Following;
