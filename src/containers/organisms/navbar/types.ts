import React from 'react';

export interface MenuItemProps {
  path: string;
  icon: React.ReactElement;
  label: string;
  active?: boolean;
}
