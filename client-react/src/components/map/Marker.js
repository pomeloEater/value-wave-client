import React from 'react';
import styled from 'styled-components';

const MarkerWrapper = styled.div`
  /* width: 0.5rem;
  height: 0.5rem; */
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: black;
  border: 1px solid black;
  cursor: pointer;
`;

const Marker = ({ onClickEvent }) => {
  return <MarkerWrapper onClick={onClickEvent} />;
};

export default Marker;
