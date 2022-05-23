/**
 * Header.js
 * author: owen
 * date: 2022-04-19
 * description: 메인-좌측 검색 영역 wrapper
 */
import React from 'react';
import styled from 'styled-components';
import HeaderSearch from 'components/header/HeaderSearch';

const HeaderWrapper = styled.header`
  position: absolute;
  z-index: 20;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 24rem;
  row-gap: 0.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    position: absolute;
    height: auto;
    width: 100%;
  }
  @media ${({ theme }) => theme.device.laptop} {
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderSearch />
    </HeaderWrapper>
  );
};

export default Header;
