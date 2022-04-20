import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initMap } from '../features/mapControlSlice';
import * as _ from 'lodash';
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
  const { map } = useSelector(state => state.mapControl);
  const dispatch = useDispatch();

  useEffect(() => {
    if (_.isNull(map)) dispatch(initMap());
  }, [dispatch, map]);

  return (
    <MapWrapper>
      <MapContainer id="mapContainer" />
    </MapWrapper>
  );
};

export default Map;
