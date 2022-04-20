import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const { kakao } = window;

const initialState = {
  map: null,
  zoomLevel: 4,
};

const setCurrentPosition = createAsyncThunk(
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
      state.zoomLevel -= 1;
      state.map.setLevel(state.zoomLevel);
    },
    zoomOut: state => {
      state.zoomLevel += 1;
      state.map.setLevel(state.zoomLevel);
    },
  },
  extraReducers: builder => {
    builder.addCase(setCurrentPosition.fulfilled, (state, action) => {
      state.map.setCenter(
        new kakao.maps.LatLng(action.payload.lat, action.payload.lon)
      );
    });
  },
});

export const { initMap, zoomIn, zoomOut } = mapSlice.actions;

export { setCurrentPosition };

export default mapSlice.reducer;
