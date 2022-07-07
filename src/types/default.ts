import React from 'react';

export type Menu = { to: string; label: string };
export type MenuWithIcon = Menu & { Icon: React.FC<React.SVGProps<SVGSVGElement>> };

export interface SiteMetadata {
  title: string;
  description?: string;
}

export interface StyleProps {
  className?: string;
  style?: React.CSSProperties;
}
