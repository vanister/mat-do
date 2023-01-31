import { Dispatch } from 'react';
import { CreateAction } from './create-types';
import { useItemService } from '../../hooks/useItemService';
import { generateDataUri } from '../../utilities/qrcode-generator';

export type CreateDispatch = Dispatch<CreateAction>;

export const CREATE_INIT = 'CREATE_INIT';
export const CREATE_POSTING_REQUEST = 'CREATE_POSTING_REQUEST';
export const CREATE_GENERATING = 'CREATE_GENERATING';
export const CREATE_GENERATED = 'CREATE_GENERATED';
export const CREATE_FAILED = 'CREATE_FAILED';
export const CREATE_UPDATE_NAME = 'CREATE_UPDATE_NAME';
export const CREATE_UPDATE_DESC = 'CREATE_UPDATE_DESC';

export const init = { type: CREATE_INIT };

export const updateName = (name: string) => ({
  type: CREATE_UPDATE_NAME,
  payload: { name }
});

export const updateDescription = (description: string) => ({
  type: CREATE_UPDATE_DESC,
  payload: { description }
});

export function generate(dispatch: CreateDispatch) {
  return async function (name: string, description?: string) {
    const itemService = useItemService();

    try {
      dispatch({
        type: CREATE_POSTING_REQUEST,
        payload: {
          error: null,
          loading: true,
          created: false,
          dataUri: null,
          id: null
        }
      });

      const { id } = await itemService.post({ name, description });

      dispatch({ type: CREATE_GENERATING });

      const dataUri = await generateDataUri(id);

      dispatch({
        type: CREATE_GENERATED,
        payload: { created: true, dataUri, id }
      });
    } catch (error) {
      dispatch({
        type: CREATE_FAILED,
        payload: {
          error: error?.message,
          loading: false,
          created: null,
          id: null,
          dataUri: null
        }
      });
    }
  };
}
