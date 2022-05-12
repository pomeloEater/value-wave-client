/**
 * Aside.js
 * author: owen
 * date: 2022-04-19
 * description: 메인-좌측 하단 매물 영역(미정)
 */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { useSelector } from 'react-redux';

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
const LocationWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 3.75rem;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 0;
  }
  @media ${({ theme }) => theme.device.laptop} {
  }
`;

const Aside = () => {
  const { centerAddress } = useSelector(state => state.mapControl);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/hello')
      .then(res => res.text())
      .then(message => setMessage(message));
  });

  return (
    <AsideWrapper>
      <LocationWrapper>
        <h1>{centerAddress}</h1>
        <h6>{message}</h6>
      </LocationWrapper>
    </AsideWrapper>
  );
};

export default Aside;
