import { media, Theme } from '@andideve/ids-react';

const table = (theme: Theme) => `
// Table > Layout

table {
  --column-gap: 1rem;
  width: 100%;
  border-collapse: collapse;
}
thead tr,
tbody tr {
  // Gap styles
  th, td {
    padding-right: calc(var(--column-gap, 0px) / 2);
    padding-left: calc(var(--column-gap, 0px) / 2);
  }
  th:first-of-type, td:first-of-type {
    padding-left: 0;
  }
  th:last-of-type, td:last-of-type {
    padding-right: 0;
  }
  // End of Gap styles
}

// Table > Typography

thead {
  --i-size: 1rem;
  text-align: left;
  font-size: ${theme.fontSizes.xs};
  line-height: ${theme.lineHeights.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  svg {
    display: inline;
    width: var(--i-size);
    height: var(--i-size);
  }
}

// Table > Optional

table {
  --table-px: 1rem;
  --row-py: .5rem;
  --tbody-mt: 1rem;
}
thead {
  height: 36px;
  tr {
    border-bottom: 1px solid var(--color-border);
  }
}
tbody {
  margin-top: var(--tbody-mt); // TODO
  tr {
    border-radius: ${theme.radii.base}; // TODO
    ${media('lg')} {
      &:hover {
        background-color: var(--color-card-hovered);
      }
    }
  }
}
thead tr,
tbody tr {
  td {
    padding-top: var(--row-py);
    padding-bottom: var(--row-py);
  }
  th:first-of-type,
  td:first-of-type {
    padding-left: var(--table-px);
  }
  th:last-of-type,
  td:last-of-type {
    padding-right: var(--table-px);
  }
}`;

export { table as tableStyles };
