import React from 'react';
import Aside from './components/aside/Aside';
import Header from './components/header/Header';
import Map from './components/map/Map';

const center = {
  latitude: 37.365264512305174,
  longitude: 127.10676860117488,
};

const App = () => {
  return (
    <>
      <Map id="mapContainer" level={4} center={center} />
      <Header />
      <Aside />
    </>
  );
};

export default App;
