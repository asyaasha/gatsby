import React from 'react';
import Image from 'gatsby-image';
import { css } from '@emotion/core';
import useInstagram from '../hooks/use-instagram';

const wrapCss = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1rem -0.5rem;
  padding: 0.5rem 0;
`;
const instaWrappCss = css`
  box-shadow: 0;
  display: block;
  margin: 0.5rem;
  max-width: calc(33% - 1rem);
  width: 120px;
  transition: 200ms box-shadow linear;

  :focus,
  :hover {
    box-shadow: 0 2px 14px #22222244;
    z-index: 10;
  }
`;
const imageCss = css`
  width: 100%;

  * {
    margin-top: 0;
  }
`;

const Insta = () => {
  const instaPhotos = useInstagram();
  // const { username } = instaPhotos[0];
  const username = 'asiya_giza';
  const renderInsta = instaPhotos.map(photo => {
    const imageProps = {
      key: photo.id,
      css: imageCss,
      fluid: photo.fluid,
      alt: photo.caption,
    };

    return (
      <a href={`https://instagram.com/p/${photo.id}/`} css={instaWrappCss}>
        <Image {...imageProps} />
      </a>
    );
  });

  return (
    <>
      <h2>Instagram posts from @{username}</h2>
      <div css={wrapCss}>{renderInsta}</div>
      <a href={`https://instagram.com/${username}`}>
        See more on Instagram &rarr;
      </a>
    </>
  );
};

export default Insta;
