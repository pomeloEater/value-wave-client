/**
 * Header.js
 * author: owen
 * date: 2022-04-19
 * description: 메인-좌측 검색 영역 wrapper
 */
import React from 'react';
import styled from 'styled-components';
import Search from './Search';

const HeaderWrapper = styled.header`
  position: absolute;
  z-index: 20;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  width: 24rem;
  row-gap: 0.5rem;
  @media screen and (min-width: 320px) and (max-width: 767px) {
    position: absolute;
    height: inherit;
    width: 100%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Search />
    </HeaderWrapper>
  );
};

export default Header;
