import { axios, cancelAllRequests, AxiosConfig } from '@mornya/restful-libs';

type State = {};
type ApiRequestOption = {
  baseURL?: string;
  method?: 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE'; // 한정적으로만 사용
  url: string | string[];
  data?: any;
  params?: any;
  headers?: any;
  useToken?: boolean;
  isFullResponse?: boolean;
  credentials?: boolean;
  XSS?: boolean;
  responseType?: 'json' | 'arraybuffer' | 'blob' | 'document' | 'text' | 'stream' | undefined;
};

const defaultApiRequestOption: ApiRequestOption = {
  method: 'get',
  url: '',
  useToken: true,
  isFullResponse: false,
  credentials: false,
  responseType: 'json',
};

function resolveUrl (url: string): {} {
  if (process.env.BUILD_ENV !== 'local' && url.startsWith('/mock/admin/')) {
    return {
      baseURL: '',
      url: url.replace(/^\/mock\/admin/, process.env.API_MOCK_URI ?? ''),
    };
  } else {
    return { url };
  }
}

// root state
const initialState = (): State => ({
});

export const state = initialState();

export const getters = {};

export const mutations = {};

export const actions = {
  /**
   * apiRequest
   * 일반 API 호출
   *
   * @param context {object}
   * @param apiRequestOption {ApiRequestOption}
   * @returns {Promise<any | null>}
   */
  async apiRequest (context: any, apiRequestOption: ApiRequestOption): Promise<any | null> {
    const option = { ...defaultApiRequestOption, ...apiRequestOption };
    const { baseURL, method, url, data, params, headers, isFullResponse, credentials, XSS, responseType } = option;
    const requestData: AxiosConfig = {
      method,
      data,
      params,
      headers,
      withCredentials: credentials,
      responseType,
    };

    const accessToken = window.localStorage.getItem(process.env.STORAGE_TOKEN_NAME ?? '');
    if (accessToken) {
      requestData.headers = {
        ...requestData.headers,
        Authorization: `${accessToken}`,
      };
    }

    // baseURL은 입력시 환경에 따른 구분은 수동으로 처리해야 함
    if (baseURL) {
      requestData.baseURL = baseURL;
    }

    try {
      if (Array.isArray(url)) {
        return axios.all(url.map(item => axios({ ...requestData, ...resolveUrl(item) })));
      } else {
        const response = await axios({ ...requestData, ...resolveUrl(url) });

        if (response) {
          if (isFullResponse) {
            return response;
          } else {
            if (XSS) {
              return JSON.parse(JSON.stringify(response.data)
                .replace(/(&amp;)/g, '&')
                .replace(/(&lt;)/g, '<')
                .replace(/(&gt;)/g, '>')
                .replace(/(&quot;)/g, '\\"')
                .replace(/(&#35;)/g, '#')
                .replace(/(&#39;)/g, '\'')
                .replace(/(&#40;)/g, '(')
                .replace(/(&#41;)/g, ')'));
            }
            return response.data;
          }
        }
      }
    } catch (e) {
      console.error(e);
      // NO FALLBACK, 오류 등에 대한 처리는 AuthProvider에서 함.
      return e.response;
    }
    return null;
  },
  /**
   * canccelApiRequest
   * API 호출 취소
   */
  cancelApiRequest (): void {
    cancelAllRequests('All requests are dropped by user cancellation.');
  },
};
