import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import { css } from '@emotion/core';

const About = () => (
  <Layout>
    <h1>About Me</h1>
    <p>
      I’m a full-stack developer. I like creating things with code and excited
      about new technologies. My background is in 3d and Interactive Media. I'm
      currently pursuing a part time{' '}
      <a
        css={css`
          text-decoration: none;
          color: black;
          font-size: 1rem;
        `}
        href={'https://www.omscs.gatech.edu/'}
      >
        Masters in CS in Georgia Tech
      </a>{' '}
      and looking for new oportunities.
    </p>
    <p>Main technologies: JavaScript, React, Redux, Node, Express.</p>
    <p></p>
    <Link to="/">&larr; back to home</Link>
  </Layout>
);

export default About;
