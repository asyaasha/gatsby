import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

const About = () => (
  <Layout>
    <h1>About Me</h1>
    <p>
      I’m a full-stack developer. I creating things with code and excited about
      new technologies. I have a background in 3d and Interactive Media.
    </p>
    <p>Skils: JavaScript, React, Redux, Node, Express</p>
    <p></p>
    <Link to="/">&larr; back to home</Link>
  </Layout>
);

export default About;
