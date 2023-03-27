import { CreateDispatch } from './create-types';
import { generateDataUri } from '../../utilities/qrcode-generator';
import { ItemService } from '../../hooks/useItemService';

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

export function generate(dispatch: CreateDispatch, service: ItemService) {
  return async function (name: string, description?: string) {
    try {
      dispatch({ type: POSTING_REQUEST });

      const item = await service.create({ name, description });
      const itemUrl = service.convertToUrl(item);

      dispatch({ type: GENERATING_QR_CODE });

      const dataUri = await generateDataUri(itemUrl);

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
