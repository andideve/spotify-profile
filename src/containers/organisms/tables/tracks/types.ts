import React from 'react';

export interface TracksTableProps {
  children: React.ReactNode;
  cols?: string[];
  disableHead?: true;
}

export interface TracksTableMetadata {
  images: { width: number; url: string }[];
  title: string;
  duration: number;
  artist?: string;
}

export interface TracksTableRowProps extends TracksTableMetadata {
  number: number;
  cols?: string[];
}
