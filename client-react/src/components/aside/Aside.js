/**
 * Aside.js
 * author: owen
 * date: 2022-04-19
 * description: 메인-좌측 하단 매물 영역(미정)
 */
import React from 'react';
import styled from 'styled-components';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';

/* 범례 */
const AsideWrapper = styled.aside`
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  width: 24rem;
  height: 100%;
  background-color: white;
  border-left: 1px;
  gap: 0.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: auto;
    bottom: 0;
  }
  @media ${({ theme }) => theme.device.laptop} {
  }
`;
const FoldButtonWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 3.75rem;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 0;
  }
  @media ${({ theme }) => theme.device.laptop} {
  }
`;
const FoldButton = styled.span`
  float: right;
  border-radius: 1rem;
  border: 1px solid var(--color-gray-400);
  color: var(--color-gray-500);
  padding: 0.1rem 0.25rem;
  width: 3.5rem;
  box-shadow: var(--shadow-sm);
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  & svg {
    display: inline-block;
    font-size: 1rem;
  }
`;
const LocationWrapper = styled.div`
  width: 100%;
  height: auto;

  @media ${({ theme }) => theme.device.mobile} {
    margin: 0;
  }
  @media ${({ theme }) => theme.device.laptop} {
  }
`;

const Aside = () => {
  return (
    <AsideWrapper>
      <FoldButtonWrapper>
        <FoldButton>
          <MdOutlineKeyboardArrowUp />
          접기
        </FoldButton>
      </FoldButtonWrapper>
      <LocationWrapper>
        <h1>TEST</h1>
      </LocationWrapper>
    </AsideWrapper>
  );
};

export default Aside;
