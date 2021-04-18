import { IapiFragment } from '@/api/apiConfig/interface';

// api基础域名
export const apiBaseUrl = {
  api_base_url: process.env.REACT_APP_BASE_URL
};

// api微服务区分标识
export const apiFragment: IapiFragment = {

  apiBase: 'api-base',

};
