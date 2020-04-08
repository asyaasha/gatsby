import React from 'react';
import { Global, css } from '@emotion/core';
import Helmet from 'react-helmet';
import Header from './header';
import useSiteMetadata from '../hooks/use-sitemetadata';
import Canvas from '../components/canvas';

const mainCss = css`
  margin: 2rem auto;
  max-width: 90vw;
  width: 550px;
`;
const globalCss = css`
  * {
    box-sizing: border-box;
    margin: 0;
  }

  /* More info: https://bit.ly/2PsCnzk */
  * + * {
    margin-top: 1rem;
  }

  html,
  body {
    margin: 0;
    color: #555;
    font-family: 'VT323', Courier New, Courier, monospace;
    font-size: 14px;
    line-height: 1.4;

    @media (min-width: calc(550px + 10vw)) {
      font-size: 18px;
    }

    /* remove margin for the main div that Gatsby mounts into */
    > div {
      margin-top: 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #2d2d86;
    line-height: 1.1;

    + * {
      margin-top: 0.5rem;
    }
  }

  strong {
    color: #222;
  }

  li {
    margin-top: 0.25rem;
  }
`;

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <Global styles={globalCss} />
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Canvas />
      <Header />
      <main id="main" css={mainCss}>
        {children}
      </main>
    </>
  );
};

export default Layout;
