import { message } from 'antd';
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'; // 引入axios和定义在node_modules/axios/index.ts文件里的类型声明
import Cookies from 'js-cookie';
import { cloneDeep } from 'lodash';
import CryptoJS from 'crypto-js';
import { apiBaseUrl } from './base';
import { ResData } from './interface';
const { api_base_url } = apiBaseUrl;

//加密方法
export function encrypt(word: any) {
  return CryptoJS.AES.encrypt(word, 'ZSYL20200707ZSYL').toString();
}

const defOptions: AxiosRequestConfig = {
  baseURL: api_base_url,
  timeout: 15000,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    token: '',
    sign: ''
  }
};

//定义请求类
class HttpRequest {
  // 定义一个接口请求类，用于创建一个axios请求实例
  constructor(public baseUrl: string = '') {
    // 这个类接收一个字符串参数，是接口请求的基本路径
    this.baseUrl = baseUrl;
  }
  // 我们实际调用接口的时候调用实例的这个方法，他返回一个AxiosPromise
  public request(options: AxiosRequestConfig): AxiosPromise<ResData> {
    const instance: AxiosInstance = axios.create(); // 这里使用axios.create方法创建一个axios实例，他是一个函数，同时这个函数包含多个属性
    const reqOptions = this.mergeConfig(defOptions, options) as any; // 合并基础路径和每个接口单独传入的配置，比如url、参数等
    this.interceptors(instance, reqOptions.url); // 调用interceptors方法使拦截器生效

    return instance(reqOptions); // 最后返回AxiosPromise
  }
  // 定义这个函数用于添加全局请求和响应拦截逻辑
  private interceptors(instance: AxiosInstance, url: string) {
    // 在这里添加请求拦截
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (config?.headers) {
          config.url = encodeURI(url);
          // 接口请求的所有配置，都在这个config对象中，他的类型是AxiosRequestConfig，你可以看到他有哪些字段
          // 如果你要修改接口请求配置，需要修改 axios.defaults 上的字段值
          config.headers.sign = encrypt('qianzai!Qw23e');
          config.headers.token = config.headers.token
            ? config.headers.token
            : Cookies.get('token') || '';
        }

        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
    // 在这里添加响应拦截
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const { data } = res; // res的类型是AxiosResponse<any>，包含六个字段，其中data是服务端返回的数据

        return data?.data
          ? res
          : { ...res, data: { data: null, msg: data?.msg || '', code: data?.code || -1 } }; // 返回数据
      },
      (error: any) => {
        console.error('[request error]<', error);

        // 这里是遇到报错的回调
        if (error.message === 'Request aborted') {
          message.error('网络请求取消');
          return Promise.resolve({ data: { data: null, code: -2, msg: '' } });
        } else if (error.message === 'Network Error') {
          message.error('网络请求错误');
          return Promise.resolve({ data: { data: null, code: -3, msg: '' } });
        } else if (error.message.search('timeout')) {
          message.error('网络请求超时');
          return Promise.resolve({ data: { data: null, code: -4, msg: '' } });
        } else {
          return Promise.reject({
            data: { data: null, code: 4, msg: JSON.stringify(error) }
          });
        }
      }
    );
  }
  private mergeConfig(
    defOptions: AxiosRequestConfig,
    options: AxiosRequestConfig
  ): AxiosRequestConfig {
    // 这个方法用于合并基础路径配置和接口单独配置
    const _defOptions = cloneDeep({ ...defOptions });
    const _options = cloneDeep({ ...options });
    return Object.assign(_defOptions, _options);
  }
}

/**
 *
 * 取消请求对象
 *
 **/
const cancelRequestObj = {
  allPendingRequests: [],
  pending: [],

  removeAllPendingRequests() {
    cancelRequestObj.allPendingRequests &&
      cancelRequestObj.allPendingRequests.forEach((fun: any) => {
        // 取消请求（调用函数就是取消该请求）
        fun('路由跳转了取消所有请求');
      });
    // 移除所有记录
    cancelRequestObj.allPendingRequests.splice(0);
  },

  removePending(key: any, isRequest = false) {
    if (cancelRequestObj.pending[key] && isRequest) {
      // @ts-expect-error
      cancelRequestObj.pending[key]('取消重复请求');
    }
    delete cancelRequestObj.pending[key];
  },

  create(config: any) {
    let reqData: any = '';

    // 处理如url相同请求参数不同时上一个请求被屏蔽的情况
    if (config?.method?.toUpperCase() === 'GET') {
      reqData = config?.url + config?.method + JSON.stringify(config?.params);
    } else {
      reqData = config?.url + config?.method + JSON.stringify(config?.data);
    }

    if (config.cancelRequest) cancelRequestObj.removePending(reqData, true);
    // 设置请求的 cancelToken（设置后就能中途控制取消了）
    config.cancelToken = new axios.CancelToken(c => {
      // @ts-expect-error
      cancelRequestObj.pending[reqData] = c;
      // @ts-expect-error
      cancelRequestObj.allPendingRequests.push(c);
    });
  }
};

// 取消所有请求
export const getConfirmation = (meg = '', callback = () => {}) => {
  cancelRequestObj.removeAllPendingRequests();
  callback();
};

export function catchErrorResponse(response: any) {
  console.debug('[catchErrorResponse]', response);
}

export default new HttpRequest();
