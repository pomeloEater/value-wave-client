import React from 'react';
import styled from 'styled-components';

const WindowWrapper = styled.div`
  position: absolute;
  white-space: nowrap;
  display: block;
  bottom: 1rem;
  background-color: slateblue;
  width: 4rem;
  height: auto;
  text-align: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-gray-400);
  box-shadow: var(--shadow-sm);
  & * {
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1rem;
  }
  &::before {
    content: '';
    border-color: slateblue transparent;
    border-style: solid;
    border-width: 0.9rem 0.9rem 0 0;
    box-shadow: var(--shadow-sm);
    display: block;
    top: 100%;
    position: absolute;
  }
`;
const ItemType = styled.span`
  width: 100%;
  color: var(--color-gray-600);
`;

const ItemValue = styled.span`
  background-color: slateblue;
  font-size: 1rem;
  color: white;
`;
const ItemYear = styled.span`
  background-color: slateblue;
  color: var(--color-gray-200);
`;

const InfoWindow = ({ item, onClickEvent }) => {
  return (
    <WindowWrapper onClick={onClickEvent}>
      <ItemType>{item.type}</ItemType>
      <ItemValue>{item.price}</ItemValue>
      <ItemYear>{item.year}</ItemYear>
    </WindowWrapper>
  );
};

export default InfoWindow;