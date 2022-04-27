/**
 * Map.js
 * author: owen
 * date: 2022-04-19
 * description: 카카오 지도 API를 이용한 지도 컨테이너 영역
 */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isNull, isUndefined } from 'lodash-es';
import styled from 'styled-components';
import { initMap, setAddressFromCenter } from '../../features/mapControlSlice';
import MapControl from './MapControl';
import Marker from './Marker';
import InfoMarker from './InfoMarker';
import useKakaoEvent from './../../hooks/useKakaoEvent';
const { kakao } = window;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const getMapMarker = (key, position, style, onClickEvent) => (
  <Marker
    key={key}
    style={style}
    position={position}
    clickable={true}
    onClickEvent={onClickEvent}
  />
);

const getInfoMarker = (
  key,
  item,
  position,
  style,
  onMarkerClick,
  onInfoClick
) => (
  <InfoMarker
    key={key}
    item={item}
    style={style}
    position={position}
    clickable={true}
    onMarkerClick={onMarkerClick}
    onInfoClick={onInfoClick}
  />
);

const Map = ({ id, center, level }) => {
  const { map, myLocation, markerPositions } = useSelector(
    state => state.mapControl
  );
  const [myLocationMarker, setMyLocationMarker] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]);
  const dispatch = useDispatch();

  /* 지도 초기화 */
  useEffect(() => {
    if (isNull(map)) dispatch(initMap({ id, center, level }));
  }, []);

  /* 중심좌표 -> 법정동 정보  */
  useKakaoEvent(map, 'tilesloaded', () => {
    dispatch(setAddressFromCenter(map.getCenter()));
  });

  /* 내위치 추가 */
  useEffect(() => {
    if (isNull(map) || isNull(myLocation) || isUndefined(myLocation)) return;
    setMyLocationMarker(getMapMarker(null, myLocation, { background: 'red' }));
    const locPosition = new kakao.maps.LatLng(
      myLocation.latitude,
      myLocation.longitude
    );
    map.setLevel(4);
    map.setCenter(locPosition);
  }, [myLocation]);

  /* 마커 정보 추가 */
  useEffect(() => {
    if (isNull(markerPositions)) return;
    if (mapMarkers?.length > 0) {
      mapMarkers.foEach(mapMarker => mapMarker.setMap(null));
    }
    let tempKey = 0;
    const newMapMarkers = markerPositions.map(position =>
      getInfoMarker(
        tempKey++,
        { type: '상업용건물', year: "'20 12월", price: '2200억' },
        position,
        { background: 'aqua' }
      )
    );
    setMapMarkers(newMapMarkers);
  }, [markerPositions]);

  return (
    <MapContainer id={id} center={center} level={level}>
      <MapControl />
      {myLocationMarker}
      {mapMarkers}
    </MapContainer>
  );
};

export default Map;
