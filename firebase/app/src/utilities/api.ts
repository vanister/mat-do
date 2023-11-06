import axios, { HttpStatusCode, Method } from 'axios';

export type RequestOptions = {
  data?: any;
  method?: Method;
  baseUrl?: string;
  additionalHeaders?: Record<string, string>;
  params?: Record<string, string | number>;
};

export type Response<T> = {
  status: HttpStatusCode;
  errorMsg?: string;
  data?: T;
};

export async function sendRequestWithAuth<T>(
  url: string,
  accessToken: string,
  options: RequestOptions = {}
): Promise<Response<T>> {
  const authOptions: RequestOptions = {
    ...options,
    additionalHeaders: { Authorization: `Bearer ${accessToken}` }
  };

  return await sendRequest(url, authOptions);
}

export async function sendRequest<T>(
  url: string,
  options: RequestOptions = {}
): Promise<Response<T>> {
  const { data, additionalHeaders, method, baseUrl, params } = options;

  const headers = {
    'Content-Type': 'application/json',
    Accepts: 'application/json',
    ...(additionalHeaders || {})
  };

  try {
    const response = await axios.request<T>({
      method: method || 'GET',
      baseURL: baseUrl || process.env.REACT_APP_API_BASE_URL,
      url,
      data,
      headers,
      params
    });

    return response;
  } catch (error) {
    throw error;
    // const axiosError = error as AxiosError;

    // if (!axiosError) {
    // }

    // // return the error status
    // return { status: axiosError.response.status, errorMsg: axiosError.message };
  }
}
