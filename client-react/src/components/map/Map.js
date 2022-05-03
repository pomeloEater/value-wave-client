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
import { getPolygonFeature, setKakaoEvent } from 'utils/kakaoUtils';
// import { getPolygonFeature } from '../../utils/kakaoUtils';
const { kakao } = window;

/** ELEMENTS **/
const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

/** FUNCTIONS **/
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

// 폴리곤 삭제 후 callback
const clearPolygons = (_polygons, _setPolygons, _callback) => {
  _polygons.forEach(_polygon => {
    _polygon.setMap(null);
  });
  _setPolygons([]);
  _callback.call(this);
};

// 폴리곤 중심좌표 구하기 (centroid algorithm)
const getCenterCoords = coordinates => {
  let area = 0,
    cx = 0,
    cy = 0;
  for (let i = 0; i < coordinates.length; i++) {
    let j = (i + 1) % coordinates.length;
    let pt1 = coordinates[i],
      pt2 = coordinates[j];

    let x1 = pt1[0],
      x2 = pt2[0],
      y1 = pt1[1],
      y2 = pt2[1];

    area += x1 * y2;
    area -= y1 * x2;

    cx += (x1 + x2) * (x1 * y2 - x2 * y1);
    cy += (y1 + y2) * (x1 * y2 - x2 * y1);
  }
  area /= 2;
  area = Math.abs(area);

  cx = cx / (6.0 * area);
  cy = cy / (6.0 * area);

  return [Math.abs(cx), Math.abs(cy)];
};

// 폴리곤 생성
const getPolygon = (map, feature) => {
  const { properties, path, coordinates } = getPolygonFeature(feature);
  console.log(properties, path);
  const polygon = new kakao.maps.Polygon({
    map,
    path,
    strokeWeight: 2,
    strokeColor: '#004c80',
    strokeOpacity: 0.8,
    fillColor: '#fff',
    fillOpacity: 0.7,
  });
  setKakaoEvent(polygon, 'mouseover', () => {
    polygon.setOptions({ fillColor: '#09f' });
  });
  setKakaoEvent(polygon, 'mouseout', () => {
    polygon.setOptions({ fillColor: '#fff' });
  });
  setKakaoEvent(polygon, 'click', () => {
    const level = map.getLevel() - 2;
    const anchorCoords = getCenterCoords(coordinates);
    map.setLevel(level, {
      anchor: new kakao.maps.LatLng(anchorCoords[1], anchorCoords[0]),
    });
  });
  return polygon;
};

/** COMPONENTS **/
const Map = ({ id, center, level }) => {
  const dispatch = useDispatch();
  const { map, myLocation, markerPositions, polygonFeatures } = useSelector(
    state => state.mapControl
  );
  const [myLocationMarker, setMyLocationMarker] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [layerPolygons, setLayerPolygons] = useState([]);

  /* 지도 초기화 */
  useEffect(() => {
    if (isNull(map)) dispatch(initMap({ id, center, level }));
  }, []);

  /* 중심좌표 -> 법정동 정보  */
  useKakaoEvent(map, 'tilesloaded', () => {
    fetch(dispatch(setAddressFromCenter(map.getCenter()))).then(() => {
      dispatch(setLevelDivision(map.getLevel()));
    });
  });

  /* 클릭 시 좌표 표출 */
  useKakaoEvent(map, 'click', e => {
    console.log(
      '%c KAKAO ',
      'background-color: black;color:yellow;font-weight:bold',
      e,
      e.latLng,
      e.point
    );
  });

  /* 확대레벨 -> 폴리곤 레이어 */
  useEffect(() => {
    // 기존 폴리곤 삭제
    if (isNull(layerPolygons)) return;
    clearPolygons(layerPolygons, setLayerPolygons, () => {
      if (polygonFeatures.length === 0) return;
      // 신규 폴리곤 추가
      const newPolygons = [];
      polygonFeatures.forEach(feature => {
        let polygon = getPolygon(map, feature);
        newPolygons.push(polygon);
      });
      setLayerPolygons(newPolygons);
    });
  }, [polygonFeatures]);

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

  /* 마커 정보 추가 (임시) */
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
