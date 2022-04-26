/**
 * Map.js
 * author: owen
 * date: 2022-04-19
 * description: 카카오 지도 API를 이용한 지도 컨테이너 영역
 */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initMap, setAddressFromCenter } from '../../features/mapControlSlice';
import { isNull } from 'lodash-es';
import styled from 'styled-components';
import MapControl from './MapControl';
import Marker from './Marker';
import useKakaoEvent from './../../hooks/useKakaoEvent';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = ({ id, center, level }) => {
  const { map, myLocation, markers } = useSelector(state => state.mapControl);
  const dispatch = useDispatch();

  /* 지도 초기화 */
  useEffect(() => {
    if (isNull(map)) dispatch(initMap({ id, center, level }));
  }, []);

  /* 중심좌표 -> 법정동 정보  */
  useKakaoEvent(map, 'tilesloaded', () => {
    dispatch(setAddressFromCenter(map.getCenter()));
  });

  return (
    <MapContainer id={id} center={center} level={level}>
      <MapControl />
      {myLocation && (
        <Marker
          style={{ background: 'white' }}
          position={myLocation}
          clickable={true}
        />
      )}
      {markers &&
        markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
            clickable={true}
            style={{ background: 'hotpink' }}
          />
        ))}
    </MapContainer>
  );
};

export default Map;
