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
  setClickLocation,
} from 'slices/mapControlSlice';
import { MapControl, Marker, InfoMarker } from 'components/map';
import useKakaoEvent from 'hooks/useKakaoEvent';
import {
  getKakaoLatLng,
  getPolygonFeature,
  setKakaoEvent,
} from 'utils/kakaoUtils';
// import { getPolygonFeature } from 'utils/kakaoUtils';
const { kakao } = window;

/** ELEMENTS **/
const MapContainer = styled.div`
  position: relative;
  float: left;
  width: 100%;
  height: inherit;
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
  const {
    map,
    myLocation,
    clickLocation,
    markerPositions,
    searchResults,
    polygonFeatures,
  } = useSelector(state => state.mapControl);
  const [myLocationMarker, setMyLocationMarker] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [searchMarkers, setSearchMarkers] = useState([]);
  const [clickMarker, setClickMarker] = useState([]);
  const [layerPolygons, setLayerPolygons] = useState([]);

  /* 지도 초기화 */
  useEffect(() => {
    if (isNull(map)) dispatch(initMap({ id, center, level }));
  }, []);

  /* 중심좌표 -> 법정동 정보  */
  useKakaoEvent(map, 'tilesloaded', async () => {
    try {
      const result = await dispatch(
        setAddressFromCenter(map.getCenter())
      ).unwrap();
      console.log(result);
      return dispatch(setLevelDivision(map.getLevel()));
    } catch (error) {
      console.error(error);
    }
  });

  /* 클릭 시 좌표 표출 */
  useKakaoEvent(map, 'click', e => {
    const latLng = {
      latitude: e.latLng.getLat(),
      longitude: e.latLng.getLng(),
    };
    dispatch(setClickLocation(latLng));
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
    const locPosition = getKakaoLatLng({ position: myLocation });
    map.setLevel(4);
    map.setCenter(locPosition);
  }, [myLocation]);

  /* 클릭 위치 마커 추가 (임시) */
  useEffect(() => {
    if (isNull(map) || isNull(clickLocation) || isUndefined(clickLocation))
      return;
    setClickMarker(
      getMapMarker(null, clickLocation, { background: 'hotpink' })
    );
  }, [clickLocation]);

  /* 마커 정보 추가 (임시) */
  useEffect(() => {
    if (isNull(markerPositions)) return;
    if (mapMarkers?.length > 0) {
      mapMarkers.forEach(mapMarker => mapMarker.setMap(null));
    }
    let tempKey = 0;
    const newMapMarkers = markerPositions.map(position =>
      tempKey % 10 == 3 ? (
        <InfoMarker
          key={tempKey++}
          style={{ background: 'aqua' }}
          position={position}
          clickable={true}
          // onMarkerClick={onMarkerClick}
          // onInfoClick={onInfoClick}
        >
          <p>타이틀</p>
          <p>가격</p>
          <p>연도</p>
        </InfoMarker>
      ) : (
        getMapMarker(tempKey++, position, { background: 'aqua' })
      )
    );
    setMapMarkers(newMapMarkers);
  }, [markerPositions]);

  /* 검색결과 정보 추가  */
  useEffect(() => {
    if (isNull(searchResults)) return;
    if (searchMarkers?.length > 0) {
      searchMarkers.forEach(searchMarker => searchMarker.setMap(null));
    }
    let tempKey = 0;
    const newSearchMarkers = searchResults.map(searchResult => (
      <InfoMarker
        key={tempKey++}
        style={{ background: 'aqua' }}
        position={{ entX: searchResult.entX, entY: searchResult.entY }}
        clickable={true}
        // onMarkerClick={onMarkerClick}
        // onInfoClick={onInfoClick}
      >
        <p>{searchResult.bdNm}</p>
      </InfoMarker>
    ));
    setSearchMarkers(newSearchMarkers);
  }, [searchResults]);

  return (
    <MapContainer id={id} center={center} level={level}>
      <MapControl />
      {myLocationMarker}
      {searchMarkers}
      {clickMarker}
      {mapMarkers}
    </MapContainer>
  );
};

export default Map;
