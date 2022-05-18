import { createSlice } from '@reduxjs/toolkit';

/** 초기값 */
const initialState = {
  searchMode: false,
};

/**
 * 화면 컨트롤 slice
 */
export const viewSlice = createSlice({
  name: 'viewControl',
  initialState,
  reducers: {
    toggleSearch: state => {
      state.searchMode = !state.searchMode;
    },
  },
});

export const { toggleSearch } = viewSlice.actions;

export default viewSlice.reducer;
