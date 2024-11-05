import axios, { AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders } from 'axios';

export type HttpMethod = "get" | "put" | "post" | "delete" | "upload" | "download" | "downpost";

export interface UniResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders | undefined;
  config: InternalAxiosRequestConfig<D> | undefined;
  request?: any;
}

const api: <T>(method: HttpMethod, url: string, params?: {} | [] | FormData) =>
  Promise<UniResponse<T, any>> = async (method, url, params) => {
  if (!url.startsWith("/doit")) {
    url = `/doit${!url.startsWith("/") ? "/" + url : url}`;
  }

  const response = await (async () => {
    switch (method) {
      case "get":
        return axios.get(url, { params });
      case "put":
        return axios.put(url, params);
      case "post":
        return axios.post(url, params);
      case "delete":
        return axios.delete(url, { data: params });
      case "upload":
        const uploadHeaders = { "Content-Type": "multipart/form-data" };
        return axios.put(url, params, { headers: uploadHeaders });
      case "download":
        return axios.get(url, { params, responseType: "blob" });
      case "downpost":
        return axios.post(url, params, { responseType: "blob" });
      default:
        throw new Error("Unsupported HTTP method");
    }
  })();
  
  const data = response.data;
  return {
    ...response,
    data: data.Result && Array.isArray(data.Result) ? data.Result : data,
  };
};

export default api;
