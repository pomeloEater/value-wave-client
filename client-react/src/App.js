import React from 'react';
import Header from './components/header/Header';
import Map from './components/map/Map';
import MapControl from './components/map/MapControl';

const App = () => {
  return (
    <>
      <Map />
      <Header />
      <MapControl />
    </>
  );
};

export default App;
