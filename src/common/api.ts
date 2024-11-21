import axios, {
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
  RawAxiosResponseHeaders,
} from 'axios';

export type HttpMethod =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'upload'
  | 'download'
  | 'downpost';

export interface UniResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders | undefined;
  config: InternalAxiosRequestConfig<D> | undefined;
  request?: any;
}

const api: <T>(
  method: HttpMethod,
  url: string,
  params?: {} | [] | FormData,
  body?: {} | FormData,
) => Promise<UniResponse<T, any>> = async (method, url, params, body) => {
  if (!url.startsWith('/doit')) {
    url = `/doit${!url.startsWith('/') ? '/' + url : url}`;
  }

  const response = await (async () => {
    switch (method) {
      case 'get':
        // GET 요청은 RequestParam만 처리
        return axios.get(url, {params});

      case 'put':
        // PUT 요청은 RequestParam + RequestBody 처리
        return axios.put(url, body, {params});

      case 'post':
        // POST 요청은 RequestParam + RequestBody 처리
        return axios.post(url, body, {params});

      case 'delete':
        // DELETE 요청은 RequestParam + RequestBody 처리
        return axios.delete(url, {params, data: body});

      case 'upload':
        // 업로드 요청은 RequestBody만 처리 (FormData)
        const uploadHeaders = {'Content-Type': 'multipart/form-data'};
        return axios.put(url, body, {headers: uploadHeaders});

      case 'download':
        // 다운로드 요청은 RequestParam만 처리
        return axios.get(url, {params, responseType: 'blob'});

      case 'downpost':
        // POST 방식의 다운로드 요청은 RequestBody 처리
        return axios.post(url, body, {responseType: 'blob'});

      default:
        throw new Error('Unsupported HTTP method');
    }
  })();

  const data = response.data;
  return {
    ...response,
    data: data.Result && Array.isArray(data.Result) ? data.Result : data,
  };
};

export default api;
