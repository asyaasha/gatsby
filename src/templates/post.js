import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { css } from '@emotion/core';
import Layout from '../components/layout';
import ReadLink from '../components/read-link';
import shader from '../../images/shader.gif';
import triangle from '../../images/triangle.gif';

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
      }
      body
    }
  }
`;

const pCss = css`
  font-size: 0.75rem;
`;
const giphCss = css`
  width: 350px;
`;

const PostTemplate = ({ data: { mdx: post } }) => {
  const { frontmatter, body } = post;
  const giph = (
    <>
      <img css={giphCss} src={triangle} />
      <img css={giphCss} src={shader} />
    </>
  );
  const renderGiph = frontmatter.author ? giph : null;
  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <p css={pCss}>April 2, 2020</p>
      {renderGiph}
      <MDXRenderer>{body}</MDXRenderer>
      <ReadLink to="/">&larr; back to all posts</ReadLink>
    </Layout>
  );
};

export default PostTemplate;
