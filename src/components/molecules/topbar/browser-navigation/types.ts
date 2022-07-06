import React from 'react';

export type BrowserNavigationTypes = 'back' | 'forward';

export interface BrowserNavigationProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'children' | 'onClick'> {
  type: BrowserNavigationTypes;
}
