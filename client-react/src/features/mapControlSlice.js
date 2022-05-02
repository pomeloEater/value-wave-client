import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isEqual, find } from 'lodash-es';
import chicken from '../apis/chicken.json';
import ctprvn from '../apis/polygon_ctprvn.json';
import { getKakaoLatLng } from '../utils/kakaoUtils';
const { kakao } = window;

const mapTypeIds = {
  TERRAIN: kakao.maps.MapTypeId.TERRAIN,
  DISTRICT: kakao.maps.MapTypeId.USE_DISTRICT,
  ROADVIEW: kakao.maps.MapTypeId.ROADVIEW,
};

const initialState = {
  map: null,
  overlay: {
    HYBRID: false,
    TERRAIN: false,
    DISTRICT: false,
  },
  myLocation: null,
  markerPositions: [],
  centerAddress: '',
  layerPaths: null,
};

/** 주소-좌표간 변환 서비스 객체 */
const geocoder = new kakao.maps.services.Geocoder();

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
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    };
  }
);

/**
 * 현재 중심좌표 행정동, 법정동 이름 가져오기
 * @returns (string) 동 이름
 */
const getAddressFromCenter = createAsyncThunk(
  'mapControl/setAddressFromCenter',
  async kakaoCenter => {
    const response = await new Promise(resolve => {
      geocoder.coord2RegionCode(
        kakaoCenter.getLng(),
        kakaoCenter.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            resolve(result);
          }
        }
      );
    });
    return find(response, { region_type: 'H' }).region_3depth_name;
    // return find(response, { region_type: 'H' }).address_name;
  }
);

/**
 * 지도 확대수준 geoJSON array 가져오기
 * @returns (array) geoJSON{type, properties, geometry}
 */
const getLevelDivision = createAsyncThunk(
  'mapControl/setLevelDivision',
  async zoomLevel => {
    let url = null;
    switch (zoomLevel) {
      default:
        url = ctprvn;
    }
    return url.features;
  }
);

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
     * @param {*} action
     */
    initMap: (state, action) => {
      const { id, center, level } = action.payload;
      const container = document.getElementById(id || 'mapContainer');
      const options = {
        center: getKakaoLatLng(center),
        level,
      };
      const kakaomap = new kakao.maps.Map(container, options);
      kakaomap.setMaxLevel(12);
      state.map = kakaomap;
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
     * 마커 사용하기(임시)
     * @param {*} state
     */
    setChickenMarkers: state => {
      state.markerPositions = chicken.positions;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrentPosition.fulfilled, (state, action) => {
        state.myLocation = action.payload;
      })
      .addCase(getAddressFromCenter.fulfilled, (state, action) => {
        state.centerAddress = action.payload;
      })
      .addCase(getLevelDivision.fulfilled, (state, action) => {
        state.layerPaths = action.payload;
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

export {
  getCurrentPosition as setCurrentPosition,
  getAddressFromCenter as setAddressFromCenter,
  getLevelDivision as setLevelDivision,
};

export default mapSlice.reducer;
