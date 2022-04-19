/**
 * Aside.js
 * author: owen
 * date: 2022-04-19
 * description: 메인-좌측 사이드바 영역
 */
import React from 'react';
import styled from 'styled-components';
import Search from './Search';

const AsideWrapper = styled.aside`
  position: absolute;
  z-index: 20;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.25rem;
  width: 24rem;
  row-gap: 0.5rem;
`;

/* 범례 */
// legendWrapper

const Aside = () => {
  return (
    <AsideWrapper>
      <Search />
      {/* <LegendWrapper/> */}
    </AsideWrapper>
  );
};

export default Aside;
