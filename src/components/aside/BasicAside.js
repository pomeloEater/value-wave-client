import React from 'react';
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

const BasicAside = () => {
  const { centerAddress } = useSelector(state => state.mapControl);

  return (
    <AsideWrapper>
      <LocationWrapper>
        <h1>{centerAddress}</h1>
      </LocationWrapper>
    </AsideWrapper>
  );
};

export default BasicAside;
