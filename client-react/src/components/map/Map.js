/**
 * Map.js
 * author: owen
 * date: 2022-04-19
 * description: 카카오 지도 API를 이용한 지도 컨테이너 영역
 */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initMap } from '../../features/mapControlSlice';
import * as _ from 'lodash';
import styled from 'styled-components';

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
