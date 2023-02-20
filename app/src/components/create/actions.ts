import { CreateDispatch } from './create-types';
import { useItemService } from '../../services';
import { generateDataUri } from '../../utilities/qrcode-generator';

export const INIT = 'INIT';
export const POSTING_REQUEST = 'POSTING_REQUEST';
export const GENERATING = 'GENERATING';
export const GENERATED = 'GENERATED';
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

export function generate(dispatch: CreateDispatch) {
  return async function (name: string, description?: string) {
    const itemService = useItemService();

    try {
      dispatch({
        type: POSTING_REQUEST
      });

      const { id } = await itemService.post({ name, description });

      dispatch({ type: GENERATING });

      const dataUri = await generateDataUri(id);

      dispatch({
        type: GENERATED,
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
