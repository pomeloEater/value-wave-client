import React from 'react';
import { renderToString } from 'react-dom/server';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash-es';
import chicken from '../apis/chicken.json';
import Marker from '../components/map/Marker';
import InfoWindow from '../components/map/InfoWindow';
const { kakao } = window;

const mapTypeIds = {
  TERRAIN: kakao.maps.MapTypeId.TERRAIN,
  DISTRICT: kakao.maps.MapTypeId.USE_DISTRICT,
  ROADVIEW: kakao.maps.MapTypeId.ROADVIEW,
};

const initialState = {
  map: null,
  clusterer: null,
  overlay: {
    HYBRID: false,
    TERRAIN: false,
    DISTRICT: false,
  },
  myLocation: null,
  markers: [],
};

/**
 * 현재 GPS 위치 가져오기
 * @returns lat 위도
 * @returns lon 경도
 */
const getCurrentPosition = createAsyncThunk(
  'mapControl/setCurrentPosition',
  async () => {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    };
  }
);

/**
 * 지도에 마커를 만든다(임시)
 * @param {*} state
 * @param {kakao.maps.LatLng} locPosition
 */
const displayMarker = (state, locPosition) => {
  const map = state.map;
  if (state.myLocation) {
    state.myLocation.marker.setMap(null);
    state.myLocation.infoWindow.setMap(null);
    state.myLocation = null;
  }

  const handleMarkerClick = () => {
    console.log('marker clicked');
  };

  const handleInfoWindowClick = () => {
    console.log('info window clicked');
  };

  const handleMapClick = () => {
    console.log('map clicked');
  };

  const infoExample = {
    item: {
      type: '상업용건물',
      price: '3.13억',
      year: "'22.01",
    },
    onClickEvent: handleInfoWindowClick,
  };
  const infoWindow = new kakao.maps.CustomOverlay({
    position: locPosition,
    map: state.map,
    content: renderToString(
      <InfoWindow
        item={infoExample.item}
        onClickEvent={infoExample.onClickEvent}
      />
    ),
    zIndex: 10,
    clickable: true,
  });

  const marker = new kakao.maps.CustomOverlay({
    position: locPosition,
    map: state.map,
    content: renderToString(<Marker onClickEvent={handleMarkerClick} />),
    zIndex: 10,
    clickable: true,
  });

  kakao.maps.event.addListener(map, 'click', handleMapClick);
  state.myLocation = { marker, infoWindow };
};

/**
 * 지도 컨트롤 slice
 */
export const mapSlice = createSlice({
  name: 'mapControl',
  initialState,
  reducers: {
    /**
     * 지도 초기화
     * @param {*} state
     */
    initMap: state => {
      const container = document.getElementById('mapContainer');
      const options = {
        center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
        level: 4,
      };
      const kakaomap = new kakao.maps.Map(container, options);
      state.map = kakaomap;
      /* 클러스터러 설정 */
      const clusterer = new kakao.maps.MarkerClusterer({
        map: kakaomap,
        averageCenter: true,
        minLevel: 5,
      });
      state.clusterer = clusterer;
    },
    /**
     * 이벤트
     * @param {*} state
     * @param {*} action
     */
    setEvent: (state, action) => {
      const { type, callback } = action.payload;
      kakao.maps.event.addListener(state.map, type, callback);
    },
    /**
     * 지도 확대/축소
     * @param {*} state
     */
    zoomIn: state => {
      state.map.setLevel(state.map.getLevel() - 1);
    },
    zoomOut: state => {
      state.map.setLevel(state.map.getLevel() + 1);
    },
    /**
     * 지도 오버레이 설정
     * @param {*} state
     * @param {*} action MapTypeId
     */
    toggleOverlayMapType: (state, action) => {
      if (isEqual(action.payload, 'HYBRID')) {
        state.overlay[action.payload]
          ? state.map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP)
          : state.map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
      } else {
        state.overlay[action.payload]
          ? state.map.removeOverlayMapTypeId(mapTypeIds[action.payload])
          : state.map.addOverlayMapTypeId(mapTypeIds[action.payload]);
      }
      state.overlay[action.payload] = !state.overlay[action.payload];
    },
    /**
     * 마커 클러스터러 사용하기(임시)
     * @param {*} state
     */
    setChickenMarkers: state => {
      const arr = chicken.positions;
      console.log(arr);
      const arrMarkers = arr.map(item => {
        return new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(item.lat, item.lng),
          map: state.map,
          content: '<div class="myLocation"></div>',
        });
      });
      console.log(arrMarkers);
      state.markers = arrMarkers;
      state.clusterer.addMarkers(arrMarkers);
    },
  },
  extraReducers: builder => {
    builder.addCase(getCurrentPosition.fulfilled, (state, action) => {
      const locPosition = new kakao.maps.LatLng(
        action.payload.lat,
        action.payload.lon
      );
      state.zoomLevel = 4;
      state.map.setLevel(4);
      state.map.setCenter(locPosition);
      displayMarker(state, locPosition);
    });
  },
});

export const {
  initMap,
  zoomIn,
  zoomOut,
  toggleOverlayMapType,
  setChickenMarkers,
} = mapSlice.actions;

export { getCurrentPosition as setCurrentPosition };

export default mapSlice.reducer;
