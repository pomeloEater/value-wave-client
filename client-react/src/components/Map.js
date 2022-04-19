import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
const { kakao } = window;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = () => {
  const container = useRef(null);
  const [map, setMap] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(4);

  useEffect(() => {
    initMap(zoomLevel);
  }, []);

  const initMap = ({ zoomLevel }) => {
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: zoomLevel,
    };
    const kakaomap = new kakao.maps.Map(container.current, options);

    setMap(kakaomap);
  };

  return (
    <MapWrapper>
      <MapContainer id="mapContainer" ref={container} />
    </MapWrapper>
  );
};

export default Map;
