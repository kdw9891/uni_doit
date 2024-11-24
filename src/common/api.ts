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

const api = async <T>(
  method: HttpMethod,
  url: string,
  params?: Record<string, any>,
  body?: Record<string, any> | FormData,
): Promise<UniResponse<T, any>> => {
  if (!url.startsWith('/doit')) {
    url = `/doit${!url.startsWith('/') ? '/' + url : url}`;
  }

  try {
    const config: Record<string, any> = {};

    // GET 요청에서 params는 URL 쿼리 스트링으로 전달
    if (method === 'get' || method === 'download') {
      config.params = params;
    }

    // POST, PUT, DELETE, UPLOAD, DOWNPOST에서 params는 쿼리 스트링으로 전달
    if (method !== 'get') {
      if (params) {
        config.params = params; // 쿼리 스트링
      }
      if (body) {
        config.data = body; // 요청 본문
      }
    }

    // 업로드의 경우 헤더에 Content-Type 추가
    if (method === 'upload' || body instanceof FormData) {
      config.headers = {
        'Content-Type': 'multipart/form-data',
      };
    }

    // 다운로드의 경우 responseType 설정
    if (method === 'download' || method === 'downpost') {
      config.responseType = 'blob';
    }

    const response = await axios({method, url, ...config});
    const data = response.data;

    return {
      ...response,
      data: data.Result && Array.isArray(data.Result) ? data.Result : data,
    };
  } catch (error) {
    console.error('API 호출 중 에러 발생:', error);
    throw error;
  }
};

export default api;
