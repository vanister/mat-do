import { CreateDispatch } from './create-types';
import { generateDataUri } from '../../utilities/qrcode-generator';
import { itemsApi } from '../../services/items-api';

export const INIT = 'INIT';
export const POSTING_REQUEST = 'POSTING_REQUEST';
export const GENERATING_QR_CODE = 'GENERATING_QR_CODE';
export const GENERATED_QR_CODE = 'GENERATED_QR_CODE';
export const FAILED = 'FAILED';
export const UPDATE_NAME = 'UPDATE_NAME';
export const UPDATE_DESC = 'UPDATE_DESC';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const init = { type: INIT };

export const validationFailed = (error: string) => ({
  type: VALIDATION_ERROR,
  payload: { error }
});

export const updateName = (name: string) => ({
  type: UPDATE_NAME,
  payload: { name }
});

export const updateDescription = (description: string) => ({
  type: UPDATE_DESC,
  payload: { description }
});

export const updateAccessToken = (accessToken: string) => ({
  type: ACCESS_TOKEN,
  payload: { accessToken }
});

export function generate(dispatch: CreateDispatch) {
  return async function (
    accessToken: string,
    name: string,
    description?: string
  ) {
    const api = itemsApi({ accessToken });

    try {
      dispatch({ type: POSTING_REQUEST });

      const { id } = await api.create({ name, description });

      dispatch({ type: GENERATING_QR_CODE });

      const dataUri = await generateDataUri(id);

      dispatch({
        type: GENERATED_QR_CODE,
        payload: { dataUri, id }
      });
    } catch (error) {
      dispatch({
        type: FAILED,
        payload: {
          error: error?.message
        }
      });
    }
  };
}
