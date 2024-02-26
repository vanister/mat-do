import { AxiosError } from 'axios';
import { CreateAction, CreateDispatch } from './create-types';
import { generateDataUri } from '../../utilities/qrcode-generator';
import { Item } from '../../models/item';
import { sendRequestWithAuth } from '../../utilities/api';
import { toScannableItemUrl } from '../../utilities/item-util';
import { User } from 'firebase/auth';

export const CREATE_REQUEST_FAILED = 'CREATE_FAILED';
export const CREATE_REQUEST = 'POSTING_REQUEST';
export const CREATE_REQUEST_SUCCESS = 'CREATE_SUCCESS';
export const INIT = 'INIT';
export const QR_CODE_GENERATED = 'QR_CODE_GENERATED';
export const QR_CODE_GENERATING = 'QR_CODE_GENERATING';
export const QR_CODE_GENERATION_FAILED = 'QR_CODE_GENERATION_FAILED';
export const UPDATE_DESC = 'UPDATE_DESC';
export const UPDATE_NAME = 'UPDATE_NAME';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';

export const init = () => ({ type: INIT });

export const validationFailed = (errorMsg: string): CreateAction => ({
  type: VALIDATION_ERROR,
  payload: { errorMessage: errorMsg }
});

export const updateName = (name: string): CreateAction => ({
  type: UPDATE_NAME,
  payload: { name }
});

export const updateDescription = (description: string): CreateAction => ({
  type: UPDATE_DESC,
  payload: { description }
});

export const createItemQrCode =
  (user: User, name: string, description: string) => async (dispatch: CreateDispatch) => {
    // todo - validate and move logic out into a helper
    try {
      dispatch({ type: CREATE_REQUEST });

      const { uid } = user;
      const accessToken = await user.getIdToken();
      const item: Partial<Item> = { name, description, userId: uid };

      const { data: id } = await sendRequestWithAuth<string>('/items', accessToken, {
        method: 'POST',
        data: item
      });

      dispatch({ type: CREATE_REQUEST_SUCCESS, payload: { id } });
      dispatch({ type: QR_CODE_GENERATING });

      const qrData = toScannableItemUrl({ ...item, id } as Item);
      const dataUri = await generateDataUri(qrData);

      dispatch({
        type: QR_CODE_GENERATED,
        payload: { dataUri }
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch({
          type: CREATE_REQUEST_FAILED,
          payload: {
            errorMessage: error?.message
          }
        });

        return;
      }

      dispatch({
        type: QR_CODE_GENERATION_FAILED,
        payload: {
          errorMessage: error?.message
        }
      });
    }
  };
