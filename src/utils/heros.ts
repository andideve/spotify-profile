import { toPlural } from './noun';
import { formatDuration } from './time-formatter';

function join(arg: (string | number | boolean | null | undefined)[], separator = ' • ') {
  return arg.filter(Boolean).join(separator);
}

export function getProfileDesc({
  publicPlaylists,
  followings,
}: {
  publicPlaylists?: number;
  followings?: number;
}) {
  const stats = [
    publicPlaylists && `${publicPlaylists} Public ${toPlural('Playlist', publicPlaylists > 1)}`,
    followings && `${followings} Following`,
  ];
  return join(stats);
}

export function getPlaylistDesc({
  owner,
  songs,
  hours,
}: {
  songs?: number;
  hours?: number;
  owner?: string | null;
}) {
  const songStats = [
    songs && `${songs} ${toPlural('song', songs > 1)}`,
    hours && `${formatDuration(hours)}`,
  ];
  return join([owner, join(songStats, ', ')]);
}

export function getAlbumDesc({
  artist,
  date,
  songs,
  hours,
}: {
  artist?: string;
  date?: string;
  songs?: number;
  hours?: number;
}) {
  const songStats = [
    songs && `${songs} ${toPlural('song', songs > 1)}`,
    hours && `${formatDuration(hours)}`,
  ];
  return join([artist, date && new Date(date).getFullYear(), join(songStats, ', ')]);
}
