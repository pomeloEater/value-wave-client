import { createSlice } from '@reduxjs/toolkit';
const { kakao } = window;

const initialState = {
  map: null,
  zoomLevel: 4,
};

export const mapSlice = createSlice({
  name: 'mapControl',
  initialState,
  reducers: {
    initMap: state => {
      const container = document.getElementById('mapContainer');
      const options = {
        center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
        level: state.zoomLevel,
      };
      const kakaomap = new kakao.maps.Map(container, options);
      state.map = kakaomap;
    },
    zoomIn: state => {
      state.zoomLevel += 1;
    },
    zoomOut: state => {
      state.zoomLevel -= 1;
    },
  },
});

export const { initMap, zoomIn, zoomOut } = mapSlice.actions;

export default mapSlice.reducer;
