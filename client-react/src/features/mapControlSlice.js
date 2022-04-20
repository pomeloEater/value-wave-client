import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const { kakao } = window;

const mapTypeId = {
  ROADMAP: kakao.maps.MapTypeId.ROADMAP,
  SKYVIEW: kakao.maps.MapTypeId.SKYVIEW,
  HYBRID: kakao.maps.MapTypeId.HYBRID,
  TERRIN: kakao.maps.MapTypeId.TERRIN,
  DISTRICT: kakao.maps.MapTypeId.USE_DISTRICT,
  ROADVIEW: kakao.maps.MapTypeId.ROADVIEW,
};

const initialState = {
  map: null,
  zoomLevel: 4,
  overlay: {
    HYBRID: false,
    TERRIN: false,
    DISTRICT: false,
  },
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
    toggleOverlayMapType: (state, action) => {
      console.log(action.payload);
      console.log(state.overlay[action.payload]);
      if (state.overlay[action.payload]) {
        state.map.removeOverlayMapTypeId(mapTypeId[action.payload]);
      } else {
        state.map.addOverlayMapTypeId(mapTypeId[action.payload]);
      }
      state.overlay[action.payload] = !state.overlay[action.payload];
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

export const { initMap, zoomIn, zoomOut, toggleOverlayMapType } =
  mapSlice.actions;

export { setCurrentPosition };

export default mapSlice.reducer;
