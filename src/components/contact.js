import React from 'react';
import Image from 'gatsby-image';
import { css } from '@emotion/core';
import useInstagram from '../hooks/use-instagram';
import twitter from '../../images/twitter.png';
import linkedin from '../../images/linkedin.png';

const iconCss = css`
  height: 35px;
  margin-top: 40px;
  margin-right: 10px;
  width: 35px;
  fill: #ffffff;
  :focus,
  :hover {
    box-shadow: 0 2px 14px #22222244;
    z-index: 10;
  }
`;

const Contact = () => {
  return (
    <>
      <div>
        <a href={`https://www.linkedin.com/in/asiyaasha/`}>
          <img css={iconCss} src={linkedin} />
        </a>
        <a href={`https://twitter.com/asiya_asha`}>
          <img css={iconCss} src={twitter} />
        </a>
      </div>
    </>
  );
};

export default Contact;
