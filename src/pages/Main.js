import React from 'react';
import styled from 'styled-components';
import Header from 'components/header/Header';
import { Map } from 'components/map';
import SearchAside from 'components/aside/SearchAside';
import BasicAside from 'components/aside/BasicAside'; // TODO ASIDE index.js 생성
import { useSelector } from 'react-redux';

/** 지도 초기 중앙 좌표값 / 확대수준 */
const center = {
  latitude: 37.365264512305174,
  longitude: 127.10676860117488,
};
const level = 4;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 384px auto;
  @media screen and (max-width: 640px) {
    grid-template-columns: auto;
  }
`;

const Main = () => {
  const { searchMode } = useSelector(state => state.viewControl);

  return (
    <MainWrapper>
      <Header />
      {searchMode ? <SearchAside /> : <BasicAside />}
      <Map id="mapContainer" level={level} center={center} />
    </MainWrapper>
  );
};

export default Main;
