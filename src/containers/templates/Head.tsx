import NextHead from 'next/head';
import React from 'react';

export interface HeadProps {
  title?: string;
  description?: string;
}

function Head({ title, description }: HeadProps) {
  return (
    <NextHead>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="icon" href="/favicons/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicons/favicon-16x16.png" type="image/png" />
      <link rel="icon" href="/favicons/favicon-32x32.png" type="image/png" />
      <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </NextHead>
  );
}

Head.defaultProps = { title: undefined, description: undefined };

export default Head;
