import { AnyAction, createSlice, Reducer } from '@reduxjs/toolkit';

import { AppState } from '@/redux/store';

import { logoutUser } from './actions';

type UserLoadingStatus = 'idle' | 'loading' | 'failed' | 'completed';

export interface UserState {
  requestStatus: UserLoadingStatus;
  id?: number;
  name?: string;
  email?: string;
  plan?: string;
  status?: string;
  credits: number;
  additionalCredits: number;
  monthlyCredits: number;
  hasBetaAccess: boolean;
  currentPeriodEndAt?: Date;
}

const initialState: UserState = {
  requestStatus: 'idle',
  credits: 100,
  monthlyCredits: 100,
  additionalCredits: 0,
  hasBetaAccess: false,
};

function isUserPendingAction(action: AnyAction): boolean {
  return action.type.endsWith('pending') && action.type.startsWith('user');
}
function isUserFulfilledAction(action: AnyAction): boolean {
  return action.type.endsWith('fulfilled') && action.type.startsWith('user');
}
function isUserRejectedAction(action: AnyAction): boolean {
  return action.type.endsWith('rejected') && action.type.startsWith('user');
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      return { ...state, ...action.payload };
    },
    updateCredits(state, action) {
      state.credits += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, () => initialState)
      .addMatcher(isUserPendingAction, (state) => {
        state.requestStatus = 'loading';
      })
      .addMatcher(isUserFulfilledAction, (_state, action) => {
        return { requestStatus: 'completed', ...action.payload };
      })
      .addMatcher(isUserRejectedAction, (state) => {
        state.requestStatus = 'failed';
      });
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, updateCredits } = userSlice.actions;

export const selectUser = (state: AppState): UserState => state.user;
export const selectUserStatus = (state: AppState): UserLoadingStatus => state.user.requestStatus;

export default userSlice.reducer as Reducer<UserState>;
