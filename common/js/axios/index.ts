import axios from 'axios';

declare module 'axios' {
  interface AxiosStatic {
    cancels?: any;
  }
  interface AxiosRequestConfig {
    cancelGroupName: string;
  }
}
// 允许请求捎带Cookie信息
axios.defaults.withCredentials = true;
// 拦截列表
axios.cancels = {};
// request请求拦截设置
axios.interceptors.request.use(
  (config) => {
    // 设置全局请求为ajax
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    // 请求超时设置
    config.timeout = 10000;

    let cancelGroupName = config.cancelGroupName;
    // 请求唯一性
    if (cancelGroupName) {
      if (axios.cancels[cancelGroupName] && axios.cancels[cancelGroupName].cancel) {
        axios.cancels[cancelGroupName].cancel(`${config.url} is still pending, the request has been canceled`);
      }
      config.cancelToken = new axios.CancelToken((c) => {
        axios.cancels[cancelGroupName] = { cancel: c };
      });
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 返回值处理
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
    //   // todo 超时处理
    //   console.error('response timeout')
    // }
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求';
          break;
        case 401:
          error.message = '未授权，请重新登录';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = '请求错误,未找到该资源';
          break;
        case 405:
          error.message = '请求方法未允许';
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器端出错';
          break;
        case 501:
          error.message = '网络未实现';
          break;
        case 502:
          error.message = '网络错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网络超时';
          break;
        case 505:
          error.message = 'http版本不支持该请求';
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      error.message = '连接到服务器失败';
    }
    return Promise.reject(error);
  },
);
