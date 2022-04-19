import React from 'react';
import Header from './components/header/Header';
import Map from './components/Map';
import MapControl from './components/MapControl';
import Nav from './components/Nav';

const App = () => {
  return (
    <>
      <Map />
      <Header />
      <Nav />
      <MapControl />
    </>
  );
};

export default App;
