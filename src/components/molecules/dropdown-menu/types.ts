import React from 'react';

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    title: string;
    icon?: React.ReactElement;
    onSelect?: React.MouseEventHandler<HTMLButtonElement>;
  }[];
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}
