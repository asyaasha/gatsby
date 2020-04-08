import React from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import ReadLink from '../components/read-link';

const imageCss = css`
  * {
    margin-top: 0;
    max-width: 80vw;
  }
`;
const articleCss = css`
  border-bottom: 1px solid #ddd;
  display: flex;
  margin-top: 0;
  padding-bottom: 1rem;

  :first-of-type {
    margin-top: 1rem;
  }
`;
const linkCss = css`
  margin: 1rem 1rem 0 0;
  width: 40px;
`;

const PostPreview = ({ post }) => {
  const { image, title, slug, excerpt } = post;
  let renderImage = null;

  if (image != null) {
    const imageProps = {
      css: imageCss,
      fixed: image.sharp.fixed,
      alt: title,
    };

    renderImage = <Image {...imageProps} />;
  }

  return (
    <article css={articleCss}>
      <Link to={slug} css={linkCss}>
        {renderImage}
      </Link>
      <div>
        <h3>{title}</h3>
        <p>{excerpt}</p>
        <ReadLink to={slug}>read &rarr;</ReadLink>
      </div>
    </article>
  );
};

export default PostPreview;
