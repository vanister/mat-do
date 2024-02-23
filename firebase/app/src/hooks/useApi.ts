import { AxiosError, HttpStatusCode, Method } from 'axios';
import { useEffect } from 'react';
import { useStateObject } from './useStateObject';
import { Response, sendRequest, sendRequestWithAuth } from '../utilities/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from 'reactfire';

export type UseApiOptions = {
  /**
   * True, to Redirect to the login page when a 401 status code is returned, false otherwise.
   *
   * Default: `true`
   */
  redirect401?: boolean;

  /** The url to return to if there was a 401 redirect to the login page. */
  returnUrl?: string;

  /** True, to include the access token, false otherwise. */
  withAuth?: boolean;
};

export type UseApiState<T> = {
  data?: T;
  error?: Error | AxiosError;
  fetching: boolean;
  response?: Response<T>;
};

const DEFAULT_OPTIONS: UseApiOptions = {
  redirect401: true
};

const LOGIN_URL = '/login';

export function useApi<T>(
  path: string,
  method: Method = 'GET',
  data?: any,
  options: UseApiOptions = {}
): UseApiState<T> {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useUser();
  const [state, setState] = useStateObject<UseApiState<T>>({ fetching: false });
  const { withAuth, redirect401, returnUrl }: UseApiOptions = { ...DEFAULT_OPTIONS, ...options };

  useEffect(() => {
    const fetch = async () => {
      try {
        setState({ fetching: true }, false);

        const token = withAuth ? await user.getIdToken() : null;
        const response = withAuth
          ? await sendRequestWithAuth<T>(path, token, { method, data })
          : await sendRequest<T>(path, { method, data });

        setState({ response, data: response.data }, false);
      } catch (error) {
        if (error.response?.status === HttpStatusCode.Unauthorized && redirect401) {
          navigate(LOGIN_URL, { replace: true, state: { from: returnUrl ?? location.pathname } });

          return;
        }

        setState({ error, fetching: false }, false);
      }
    };

    fetch();
  }, [path]);

  return state;
}
