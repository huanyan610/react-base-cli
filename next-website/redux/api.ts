import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

async function thunkHandler(
  asyncFn: AxiosPromise,
  thunkAPI: { rejectWithValue: CallableFunction }
): Promise<any> {
  try {
    const response = await asyncFn;
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
}

function buildUrl(url: string, params: Record<string, string>): string {
  for (const key in params) {
    if (url.search(':' + key)) {
      url = url.replace(':' + key, params[key]);
    }
  }

  return url;
}

export default class api {
  static get =
    (url: string, config: AxiosRequestConfig = {}) =>
    (obj = {}, thunkAPI: { rejectWithValue: CallableFunction }): any =>
      thunkHandler(axios.get(buildUrl(url, obj), { withCredentials: true, ...config }), thunkAPI);

  static post =
    (url: string, config: AxiosRequestConfig = {}) =>
    (obj = {}, thunkAPI: { rejectWithValue: CallableFunction }): any =>
      thunkHandler(
        axios.post(buildUrl(url, obj), obj, { withCredentials: true, ...config }),
        thunkAPI
      );

  static put =
    (url: string, config: AxiosRequestConfig = {}) =>
    (obj = {}, thunkAPI: { rejectWithValue: CallableFunction }): any =>
      thunkHandler(
        axios.put(buildUrl(url, obj), obj, { withCredentials: true, ...config }),
        thunkAPI
      );

  static delete =
    (url: string, config: AxiosRequestConfig = {}) =>
    (obj = {}, thunkAPI: { rejectWithValue: CallableFunction }): any =>
      thunkHandler(
        axios.delete(buildUrl(url, obj), { withCredentials: true, ...config }),
        thunkAPI
      );
}
