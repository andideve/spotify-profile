import { Theme } from '../theme';
import media from '../utils/media';

export const globalStyles = (theme: Theme) => `
  :root {
    color-scheme: dark;
  }
  * {
    -webkit-tap-highlight-color: transparent;
  }
  body {
    color: ${theme.colors.body.text};
    background-color: ${theme.colors.body.background};
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  main {
    flex: 1 1 auto;
  }
  a.underlined {
    text-decoration: none;
    &:focus {
      text-decoration: underline;
    }
    ${media('lg')} {
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .sr-only {
    position: absolute;
    left: -100vw;
  }
  .single-line-text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .color-secondary {
    color: ${theme.colors.secondary.default};
  }
`;
