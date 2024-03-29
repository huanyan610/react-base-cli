import { AnyAction, createSlice, Reducer } from '@reduxjs/toolkit';

import { loginUser } from './actions';

type UserLoadingStatus = 'idle' | 'loading' | 'failed' | 'completed';

export interface IuserState {
  requestStatus: UserLoadingStatus;
  id?: number;
  name?: string;
  email?: string;
  status?: string;
}

const initialState: IuserState = {
  requestStatus: 'idle',
  id: 0,
  name: '',
  email: '',
  status: '',
};

function isUserPendingAction(action: AnyAction): boolean {
  return action.type.endsWith('pending');
}
function isUserFulfilledAction(action: AnyAction): boolean {
  return action.type.endsWith('fulfilled');
}
function isUserRejectedAction(action: AnyAction): boolean {
  return action.type.endsWith('rejected');
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(loginUser.fulfilled, (state: any, action: any) => {
        return { ...state, ...action.payload };
      })
      .addMatcher(isUserPendingAction, (state: any) => {
        state.requestStatus = 'loading';
      })
      .addMatcher(isUserFulfilledAction, (state: any) => {
        state.requestStatus = 'completed';
      })
      .addMatcher(isUserRejectedAction, (state: any) => {
        state.requestStatus = 'failed';
      });
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions;

export default userSlice.reducer as Reducer<IuserState>;
