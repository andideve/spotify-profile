import { DropdownMenuProps } from '../../dropdown-menu/types';

export interface UserDropdownProps {
  images: { width: number; url: string }[];
  name: string;
  menuItems: DropdownMenuProps['items'];
  className?: string;
}
