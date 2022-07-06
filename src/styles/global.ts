import { media, newTransition, Theme } from '@andideve/ds-react';

const global = (theme: Theme) => `
:root {
  // 'ds-react' overrides

  --color-foreground: hsl(0, 0%, 100%);
  --color-background: hsl(0, 0%, 7%);

  --color-button-foreground: var(--color-white);
  --color-button-background: hsl(0deg, 0%, 20%);

  --color-primary: hsl(125deg, 56%, 61%);
  --color-primary-hovered: hsl(125deg, 56%, 61%);
  --color-primary-contrast: var(--color-black);

  --color-secondary: hsl(0, 0%, 70%);
  --color-secondary-hovered: var(--color-white);
  --color-secondary-contrast: var(--color-black);

  --color-error: hsl(0, 100%, 64%);

  --color-border: hsl(0, 0%, 12%);
  --color-border-hovered: var(--color-primary);

  --color-card: hsla(0, 0%, 100%, .04);
  --color-card-hovered: hsl(0, 0%, 12%);

  // end of 'ds-react' overrides

  color-scheme: dark;
}

#__next {
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1 1 auto;
}

// Resets

ul {
  list-style: none;
}

// Colors

.color-foreground {
  color: var(--color-foreground);
}
.color-primary {
  color: var(--color-primary);
}
.color-secondary,
.color-secondary--hoverable {
  color: var(--color-secondary);
}
.color-secondary--hoverable {
  transition: var(--transition-color);
  &:focus {
    color: var(--color-secondary-hovered);
  }
  ${media('lg')} {
    &:hover {
      color: var(--color-secondary-hovered);
    }
  }
}
.bg-color-card {
  background-color: var(--color-card);
}

// Layouts

.overlay--before:before,
.overlay--after:after {
  content: '';
}
.overlay,
.overlay--before:before,
.overlay--after:after {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.inset-0,
.overlay,
.overlay--before:before,
.overlay--after:after {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.p-relative {
  position: relative;
}
.p-absolute {
  position: absolute;
}
.p-fixed {
  position: fixed;
}
.d-block {
  display: block;
}
.d-inline-block {
  display: inline-block;
}
.d-flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.overflow-hidden {
  overflow: hidden;
}

// Typography

.font-regular {
  font-weight: 400 !important;
}
.font-medium {
  font-weight: 500;
}
.font-semibold {
  font-weight: 600 !important;
}
.font-bold {
  font-weight: 700 !important;
}
.font-extrabold {
  font-weight: 800 !important;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}

// Radii

.rounded {
  border-radius: ${theme.radii.base};
}
.rounded-full {
  border-radius: ${theme.radii.full} !important;
}

// Components

[class^="card"] {
  padding: 1rem;
  border-radius: ${theme.radii.lg};
  background-color: var(--color-card);
  transition: ${newTransition('background-color', { duration: 300 })};
}
${media('lg')} {
  .card-hoverable:hover {
    background-color: var(--color-card-hovered);
  }
}

// Others

.sr-only {
  opacity: 0;
  position: absolute;
  left: -100vw;
}
.focus-visible:focus-visible {
  outline: 1px solid var(--color-foreground);
}`;

export { global as globalStyles };
