import axios, { AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders } from 'axios';
import { globalContext } from './globalContext';
import { Alert } from 'react-native';

export type HttpMethod = "get" | "put" | "post" | "delete" | "upload" | "download" | "downpost";

export interface UniResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders | undefined;
  config: InternalAxiosRequestConfig<D> | undefined;
  request?: any;
}

const api: <T>(method: HttpMethod, url: string, params: {} | [] | FormData) =>
  Promise<UniResponse<T, any>> = (method, url, params) => {
  if (!url.startsWith("/doit"))
    url = `/doit${!url.startsWith("/") ? "/" + url : url}`;
  
  const headers = {
    Authorization: `Bearer ${globalContext.autoToken}`,
  };

  console.log(url);
  
  switch (method) {
    case "get":
      return axios.get(url, { params, headers: headers });
    case "put":
      return axios.put(url, params, { headers: headers });
    case "post":
      return axios.post(url, params, { headers: headers });
    case "delete":
      return axios.delete(url, { params, headers: headers });
    case "upload":
      const uploadHeaders = {...headers, ...{ "Content-Type": "multipart/form-data" }};
      return axios.put(url, params, { headers: uploadHeaders });
    case "download":
      return axios.get(url, { params, headers: headers, responseType: "blob" });
    case "downpost":
      return axios.post(url, params, { headers: headers, responseType: "blob" });
    }
};

axios.interceptors.response.use(response => {
  return response;
},
error => {
  if(error.response?.data == "TokenExpired"){
    if(globalContext.autoToken){ 
      globalContext.autoToken = null;
      Alert.alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
      //TODO:route to home
      return;
    }
  }

  throw error;
});

export default api;