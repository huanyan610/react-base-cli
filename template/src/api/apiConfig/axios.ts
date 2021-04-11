import { apiBaseUrl } from './apiBase';
import { ResData } from './interface';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios'; // 引入axios和定义在node_modules/axios/index.ts文件里的类型声明
import { message } from 'antd';
import Cookies from 'js-cookie';

const { api_base_url } = apiBaseUrl;

interface baseConfig extends AxiosRequestConfig {
  spin?: boolean;
}

const tk = Cookies.get('token');

const defOptions: baseConfig = {
  baseURL: '',
  timeout: 15000,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    token: tk
  }
};

//设置baseUrl
const editBasUrl = function (config: any) {
  config.baseURL = api_base_url;
};

//定义请求类
class HttpRequest {
  // 定义一个接口请求类，用于创建一个axios请求实例
  constructor(public baseUrl: string = '') {
    // 这个类接收一个字符串参数，是接口请求的基本路径
    this.baseUrl = baseUrl;
  }
  // 我们实际调用接口的时候调用实例的这个方法，他返回一个AxiosPromise
  public request(options: baseConfig): AxiosPromise<ResData> {
    const instance: AxiosInstance = axios.create(); // 这里使用axios.create方法创建一个axios实例，他是一个函数，同时这个函数包含多个属性
    options = this.mergeConfig(defOptions, options); // 合并基础路径和每个接口单独传入的配置，比如url、参数等
    this.interceptors(instance, options.url); // 调用interceptors方法使拦截器生效
    return instance(options); // 最后返回AxiosPromise
  }
  // 定义这个函数用于添加全局请求和响应拦截逻辑
  private interceptors(instance: AxiosInstance, url?: string) {
    // 在这里添加请求拦截
    instance.interceptors.request.use(
      (config: baseConfig) => {
        // 接口请求的所有配置，都在这个config对象中，他的类型是AxiosRequestConfig，你可以看到他有哪些字段
        // 如果你要修改接口请求配置，需要修改 axios.defaults 上的字段值
        config.headers.token = config.headers.token ? config.headers.token : tk || '';
        //添加token
        // config.headers.Authorization = `Bearer ${Cookies.get(
        //   process.env.REACT_APP_TOKEN as string
        // )}`;
        editBasUrl(config);

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
        const { code, msg } = data; // 通常服务端会将响应状态码、提示信息、数据等放到返回的数据中
        if (code !== 0) {
          // 这里我们在服务端将正确返回的状态码标为0
          console.error(msg); // 如果不是0，则打印错误信息，我们后面讲到UI组件的时候，这里可以使用消息窗提示
        }

        if (code === 36) {
          console.log('code===36登录过期');
        }

        return res; // 返回数据
      },
      (error: any) => {
        // 这里是遇到报错的回调
        if (error.response) {
          switch (error.response.status) {
            case 400:
              error.message = '错误请求';
              message.error('错误请求');
              break;
            case 401:
              error.message = '未授权，请重新登录';
              message.error('未授权，请重新登录');
              break;
            case 403:
              error.message = '拒绝访问';
              message.error('拒绝访问');
              break;
            case 404:
              error.message = '请求错误,未找到该资源';
              message.error('请求错误,未找到该资源');
              break;
            case 405:
              error.message = '请求方法未允许';
              message.error('请求方法未允许');
              break;
            case 408:
              error.message = '请求超时';
              message.error('请求超时');
              break;
            case 500:
              error.message = '服务器端出错';
              message.error('服务器端出错');
              break;
            case 501:
              error.message = '网络未实现';
              message.error('网络未实现');
              break;
            case 502:
              error.message = '网络错误';
              message.error('网络错误');
              break;
            case 503:
              error.message = '服务不可用';
              message.error('服务不可用');
              break;
            case 504:
              error.message = '网络超时';
              message.error('网络超时');
              break;
            case 505:
              error.message = 'http版本不支持该请求';
              message.error('http版本不支持该请求');
              break;
            default:
              error.message = `连接错误${error.response.status}`;
              message.error(`连接错误${error.response.status}`);
          }
        } else {
          message.error('服务器未响应');
        }
        return Promise.reject(error);
      }
    );
  }
  private mergeConfig(defOptions: baseConfig, options: baseConfig): baseConfig {
    // 这个方法用于合并基础路径配置和接口单独配置
    return Object.assign(defOptions, options);
  }
}

export default new HttpRequest();
