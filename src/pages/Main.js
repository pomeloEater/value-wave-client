import React from 'react';
import Aside from 'components/aside/Aside';
import Header from 'components/header/Header';
import { Map } from 'components/map';

/** 지도 초기 중앙 좌표값 / 확대수준 */
const center = {
  latitude: 37.365264512305174,
  longitude: 127.10676860117488,
};
const level = 4;

const Main = () => {
  return (
    <>
      <Map id="mapContainer" level={level} center={center} />
      <Header />
      <Aside />
    </>
  );
};

export default Main;
