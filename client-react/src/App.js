import React from 'react';
import Aside from './components/aside/Aside';
import Header from './components/header/Header';
import Map from './components/map/Map';
import MapControl from './components/map/MapControl';

const App = () => {
  return (
    <>
      <Map />
      <Header />
      <Aside />
      <MapControl />
    </>
  );
};

export default App;
