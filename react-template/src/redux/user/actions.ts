import { createAsyncThunk } from '@reduxjs/toolkit';

import { login } from '@/api/apiServer/apiUser';

export const loginUser = createAsyncThunk('user/loginUser', async (thunkAPI) => {
  const data = await login();
  return data;
});
