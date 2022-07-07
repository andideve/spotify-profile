import { BrandProps } from '../../../components/molecules/topbar/brand';
import { Menu } from '../../../types/default';

export interface DrawerOffsetProps {
  top: number;
  bottom: number;
}

export interface TopbarProps {
  brand: BrandProps;
  drawerOffset: DrawerOffsetProps;
  menuItems?: Menu[];
}
