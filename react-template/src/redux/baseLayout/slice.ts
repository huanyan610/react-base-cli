import { createSlice, Reducer } from '@reduxjs/toolkit';

interface Istate {
  collapsed?: boolean;
  selectKeys?: string[] | null;
  openKeys?: string[] | null;
}
const initialState: Istate = {
  collapsed: false,
  selectKeys: null,
  openKeys: null,
};

export const baseLayoutSlice = createSlice({
  name: 'baseLayout',
  initialState,
  reducers: {
    collapsedAction(state, action) {
      return { ...state, collapsed: action.payload };
    },
    openKeyAction(state, action) {
      return { ...state, openKeys: action.payload };
    },
    selectKeyAction(state, action) {
      return { ...state, selectKeys: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { collapsedAction, openKeyAction, selectKeyAction } = baseLayoutSlice.actions;

export default baseLayoutSlice.reducer as Reducer<Istate>;
