import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

const NavLink = styled(Link)`
  color: #ffff00;
  font-size: 1.5rem;
  font-weight: ${props => props.fontWeight || 'normal'};
  line-height: 1.5;
  margin: 0 0.5rem 0 0;
  padding: 0.25rem;
  text-decoration: none;

  &.current-page {
    border-bottom: 2px solid #ffff00;
  }

  &:last-of-type {
    margin-right: 30px;
  }
`;

const Header = () => (
  <header
    css={css`
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 5vw;

      @media (min-width: calc(550px + 10vw)) {
        padding-left: calc((100vw - 550px - 0.5rem) / 2);
        padding-right: calc((100vw - 550px - 0.5rem) / 2);
      }
    `}
  >
    <NavLink to="/" fontWeight="bold"></NavLink>
    <nav
      css={css`
        margin-top: 0;
      `}
    >
      <NavLink to="/" activeClassName="current-page">
        Home
      </NavLink>
      <NavLink to="/about/" activeClassName="current-page">
        About
      </NavLink>
    </nav>
  </header>
);

export default Header;
