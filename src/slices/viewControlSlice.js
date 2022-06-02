import { createSlice } from '@reduxjs/toolkit';

/** 초기값 */
const initialState = {
  searchMode: false,
  pnu: '',
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
    setPnu: (state, action) => {
      state.pnu = action.payload;
    },
  },
});

export const { toggleSearch, setPnu } = viewSlice.actions;

export default viewSlice.reducer;
