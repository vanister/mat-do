import { CreateAction, CreateDispatch } from './create-types';
import { generateDataUri } from '../../utilities/qrcode-generator';
import { ItemService } from '../../hooks/services/useItemService';
import { toScannableItemUrl } from '../../utilities/item-util';
import { User } from 'firebase/auth';
import { Item } from '../../models/item';
import { sendRequestWithAuth } from '../../utilities/api';

export const INIT = 'INIT';
export const POSTING_REQUEST = 'POSTING_REQUEST';
export const GENERATING_QR_CODE = 'GENERATING_QR_CODE';
export const GENERATED_QR_CODE = 'GENERATED_QR_CODE';
export const FAILED = 'FAILED';
export const UPDATE_NAME = 'UPDATE_NAME';
export const UPDATE_DESC = 'UPDATE_DESC';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';

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

export function generateQrCode(user: User, name: string, description?: string) {
  return async function (dispatch: React.Dispatch<CreateAction>) {
    try {
      dispatch({ type: POSTING_REQUEST });

      const { uid } = user;
      const accessToken = await user.getIdToken();
      const item: Partial<Item> = { name, description, userId: uid };

      const { data: id } = await sendRequestWithAuth<string>(
        '/items',
        accessToken,
        { method: 'POST', data: item }
      );

      const qrData = toScannableItemUrl({ ...item, id } as Item);

      dispatch({ type: GENERATING_QR_CODE });

      const dataUri = await generateDataUri(qrData);

      dispatch({
        type: GENERATED_QR_CODE,
        payload: { dataUri, id: item.id }
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
