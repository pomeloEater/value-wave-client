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
import {
  initMap,
  setAddressFromCenter,
  setLevelDivision,
} from '../../features/mapControlSlice';
import MapControl from './MapControl';
import Marker from './Marker';
import InfoMarker from './InfoMarker';
import useKakaoEvent from './../../hooks/useKakaoEvent';
// import { getPolygonPath } from '../../utils/kakaoUtils';
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
  const { map, myLocation, markerPositions, layerPaths } = useSelector(
    state => state.mapControl
  );
  const [myLocationMarker, setMyLocationMarker] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [layerPolygons /* setLayerPolygons */] = useState([]);
  const dispatch = useDispatch();

  /* 지도 초기화 */
  useEffect(() => {
    if (isNull(map)) dispatch(initMap({ id, center, level }));
  }, []);

  /* 중심좌표 -> 법정동 정보  */
  useKakaoEvent(map, 'tilesloaded', () => {
    // dispatch(setAddressFromCenter(map.getCenter()));
    // fetch(dispatch(setAddressFromCenter(map.getCenter()))).then(() => {
    //   dispatch(setLevelDivision(map.getLevel()));
    // });

    /* test draw polygon */
    var outer = [
      new kakao.maps.LatLng(33.45086654081833, 126.56906858718982),
      new kakao.maps.LatLng(33.45010890948828, 126.56898629127468),
      new kakao.maps.LatLng(33.44979857909499, 126.57049357211622),
      new kakao.maps.LatLng(33.450137483918496, 126.57202991943016),
      new kakao.maps.LatLng(33.450706188506054, 126.57223147947938),
      new kakao.maps.LatLng(33.45164068091554, 126.5713126693152),
    ];

    var hole = [
      new kakao.maps.LatLng(33.4506262491095, 126.56997323165163),
      new kakao.maps.LatLng(33.45029422800042, 126.57042659659218),
      new kakao.maps.LatLng(33.45032339792896, 126.5710395101452),
      new kakao.maps.LatLng(33.450622037218295, 126.57136070280123),
      new kakao.maps.LatLng(33.450964416902046, 126.57129448564594),
      new kakao.maps.LatLng(33.4510527150534, 126.57075627706975),
    ];
    let path = [outer, hole];
    // 다각형을 생성하고 지도에 표시합니다
    var polygon = new kakao.maps.Polygon({
      // map,
      path, // 좌표 배열의 배열로 하나의 다각형을 표시할 수 있습니다
      strokeWeight: 2,
      strokeColor: '#b26bb2',
      strokeOpacity: 0.8,
      fillColor: '#f9f',
      fillOpacity: 0.7,
      zIndex: 30,
    });
    console.log(polygon);
    polygon.setMap(map);
  });

  /* 확대레벨 -> 폴리곤 레이어 */
  useEffect(() => {
    // var outer = [
    //   new kakao.maps.LatLng(33.45086654081833, 126.56906858718982),
    //   new kakao.maps.LatLng(33.45010890948828, 126.56898629127468),
    //   new kakao.maps.LatLng(33.44979857909499, 126.57049357211622),
    //   new kakao.maps.LatLng(33.450137483918496, 126.57202991943016),
    //   new kakao.maps.LatLng(33.450706188506054, 126.57223147947938),
    //   new kakao.maps.LatLng(33.45164068091554, 126.5713126693152),
    // ];
    // var hole = [
    //   new kakao.maps.LatLng(33.4506262491095, 126.56997323165163),
    //   new kakao.maps.LatLng(33.45029422800042, 126.57042659659218),
    //   new kakao.maps.LatLng(33.45032339792896, 126.5710395101452),
    //   new kakao.maps.LatLng(33.450622037218295, 126.57136070280123),
    //   new kakao.maps.LatLng(33.450964416902046, 126.57129448564594),
    //   new kakao.maps.LatLng(33.4510527150534, 126.57075627706975),
    // ];
    // let path = [outer, hole];
    // // 다각형을 생성하고 지도에 표시합니다
    // var polygon = new kakao.maps.Polygon({
    //   map,
    //   path, // 좌표 배열의 배열로 하나의 다각형을 표시할 수 있습니다
    //   strokeWeight: 2,
    //   strokeColor: '#b26bb2',
    //   strokeOpacity: 0.8,
    //   fillColor: '#f9f',
    //   fillOpacity: 0.7,
    //   zIndex: 30,
    // });
    // console.log(polygon);
    // polygon.setMap(map);
  }, [layerPaths]);

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
      tempKey % 10 == 3
        ? getInfoMarker(
            tempKey++,
            { type: '상업용건물', year: "'20 12월", price: '2200억' },
            position,
            { background: 'aqua' }
          )
        : getMapMarker(tempKey++, position, { background: 'aqua' })
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
