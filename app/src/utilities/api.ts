import axios, { AxiosResponse, Method } from 'axios';

export type RequestOptions = {
  url: string;
  accessToken: string;
  data?: any;
  method?: Method;
  baseUrl?: string;
  additionalHeaders?: { [name: string]: string };
};

export async function sendRequest<T>(
  options: RequestOptions
): Promise<AxiosResponse<T>> {
  const { accessToken, data, url, additionalHeaders, method, baseUrl } =
    options;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    Accepts: 'application/json',
    ...(additionalHeaders || {})
  };

  try {
    const response = await axios.request<T>({
      method: method || 'GET',
      baseURL: baseUrl || '',
      url,
      data,
      headers
    });

    return response;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
