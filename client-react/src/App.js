import React from 'react';
import Aside from './components/aside/Aside';
import Map from './components/Map';
import MapControl from './components/MapControl';
import Nav from './components/Nav';

const App = () => {
  return (
    <>
      <Aside />
      <Nav />
      <Map />
      <MapControl />
    </>
  );
};

export default App;
