/**
 * Nav.js
 * author: owen
 * date: 2022-04-19
 * description: 메인-center 현재위치 표출 영역
 */
import React from 'react';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  position: absolute;
  z-index: 10;
  width: 100%;
  text-align: center;
  top: 1.25rem;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
  @media ${({ theme }) => theme.device.laptop} {
    display: none;
  }
`;

const CenterAddressText = styled.span`
  display: inline-block;
  height: 2rem;
  padding: 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 2rem;
  border-radius: 1.5rem;
  background-color: white;
  box-shadow: var(--shadow-md);
`;

const Nav = () => {
  return (
    <NavWrapper>
      <CenterAddressText>center 행정동 입력</CenterAddressText>
    </NavWrapper>
  );
};

export default Nav;
