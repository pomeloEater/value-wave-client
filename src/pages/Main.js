import React from 'react';
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

const Main = () => {
  const { searchMode } = useSelector(state => state.viewControl);

  return (
    <>
      <Header />
      {searchMode ? <SearchAside /> : <BasicAside />}
      <Map id="mapContainer" level={level} center={center} />
    </>
  );
};

export default Main;
