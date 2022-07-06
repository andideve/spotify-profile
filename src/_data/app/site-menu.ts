import Book from '../../components/atoms/icons/Book';
import Home from '../../components/atoms/icons/Home';

import { SITE_PATHS } from '../../config/globals';
import { Menu, MenuWithIcon } from '../../types/default';

export const libraryMenu: Menu[] = [
  { label: 'Playlists', to: SITE_PATHS.PLAYLISTS },
  { label: 'Artists', to: SITE_PATHS.ARTISTS },
  { label: 'Albums', to: SITE_PATHS.ALBUMS },
];

export const siteMenu: MenuWithIcon[] = [
  { label: 'Profile', to: SITE_PATHS.PROFILE, Icon: Home },
  { label: 'Your Library', to: libraryMenu[0].to, Icon: Book },
];
