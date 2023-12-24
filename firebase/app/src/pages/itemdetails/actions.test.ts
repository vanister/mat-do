import { describe } from '@jest/globals';
import { sendRequestWithAuth } from '../../utilities/api';
import {
  ITEM_DETAILS_FAILURE,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  getItemDetails
} from './actions';

jest.mock('../../utilities/api', () => ({
  sendRequestWithAuth: jest.fn()
}));

const mockDispatch = jest.fn();
const mockSendRequestWithAuth = sendRequestWithAuth as jest.Mock;

describe('getItemDetails Thunk', () => {
  const itemId = '123';
  const accessToken = 'token';

  beforeEach(() => {
    mockDispatch.mockClear();
    mockSendRequestWithAuth.mockClear();
  });

  describe('When the API request is successful', () => {
    it('should dispatch ITEM_DETAILS_REQUEST and ITEM_DETAILS_SUCCESS', async () => {
      const mockItem = { id: itemId, name: 'Test Item' };
      mockSendRequestWithAuth.mockResolvedValueOnce({ data: mockItem });

      await getItemDetails(itemId, accessToken)(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({ type: ITEM_DETAILS_REQUEST });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: ITEM_DETAILS_SUCCESS,
        payload: { item: mockItem }
      });
    });
  });

  describe('When the API request fails', () => {
    it('should dispatch ITEM_DETAILS_REQUEST and ITEM_DETAILS_FAILURE', async () => {
      const errorMessage = 'Error fetching item details';
      mockSendRequestWithAuth.mockRejectedValueOnce(new Error(errorMessage));

      await getItemDetails(itemId, accessToken)(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({ type: ITEM_DETAILS_REQUEST });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: ITEM_DETAILS_FAILURE,
        payload: { errorMessage }
      });
    });
  });
});
