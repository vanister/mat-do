import { describe, expect, test, beforeEach } from '@jest/globals';
import { User } from 'firebase/auth';
import { sendRequestWithAuth } from '../../utilities/api';
import { generateDataUri } from '../../utilities/qrcode-generator';
import { INFO_HASH_KEY, toScannableItemUrl } from '../../utilities/item-util';
import {
  CREATE_REQUEST_FAILED,
  CREATE_REQUEST,
  CREATE_REQUEST_SUCCESS,
  CREATE_QR_CODE_GENERATED,
  CREATE_QR_CODE_GENERATING,
  CREATE_QR_CODE_GENERATION_FAILED,
  createItemQrCode
} from './actions';
import { AxiosError } from 'axios';

jest.mock('../../utilities/qrcode-generator');
jest.mock('../../utilities/item-util');
jest.mock('../../utilities/api', () => ({
  sendRequestWithAuth: jest.fn()
}));

describe('Create Actions', () => {
  const uid = 'unique-user-id';
  const accessToken = 'an.access.token';
  const mockSendRequestWithAuth = sendRequestWithAuth as jest.Mock;
  const mockGenerateDatauri = generateDataUri as jest.Mock;
  const mockToScannableItemUrl = toScannableItemUrl as jest.Mock;
  const mockDispatch = jest.fn();
  const mockGetIdToken = jest.fn();

  const mockUser: Partial<User> = {
    uid,
    getIdToken: mockGetIdToken
  };

  describe('WHEN creating an item', () => {
    const name = 'Blaster';
    const description = 'The one she stole from Cassian';

    beforeEach(() => {
      jest.clearAllMocks();
    });

    beforeEach(() => {
      mockGetIdToken.mockResolvedValueOnce(accessToken);
    });

    test('should save the item and create a qr code data uri', async () => {
      const itemId = 'new-item-uuid';
      const dataUri = 'data:image/png;base64,aBase64EncodedItem';

      mockSendRequestWithAuth.mockResolvedValueOnce({ data: itemId });
      mockGenerateDatauri.mockResolvedValueOnce(dataUri);
      mockToScannableItemUrl.mockReturnValueOnce(
        `https://mat-do.com/scan/${itemId}#${INFO_HASH_KEY}=aBase64EncodedItem`
      );

      await createItemQrCode(mockUser as User, name, description)(mockDispatch);

      expect(mockSendRequestWithAuth).toHaveBeenCalledWith('/items', accessToken, {
        method: 'POST',
        data: { name, description, userId: uid }
      });

      expect(mockDispatch).toHaveBeenCalledTimes(4);
      expect(mockDispatch).toHaveBeenCalledWith({ type: CREATE_REQUEST });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: CREATE_REQUEST_SUCCESS,
        payload: { id: itemId }
      });
      expect(mockDispatch).toHaveBeenCalledWith({ type: CREATE_QR_CODE_GENERATING });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: CREATE_QR_CODE_GENERATED,
        payload: { dataUri }
      });
    });

    describe('AND there are errors', () => {
      test('should handle AxiosErrors', async () => {
        mockSendRequestWithAuth.mockRejectedValueOnce(new AxiosError('an api error'));

        await createItemQrCode(mockUser as User, name, description)(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledTimes(2);
        expect(mockDispatch).toHaveBeenCalledWith({ type: CREATE_REQUEST });
        expect(mockDispatch).toHaveBeenCalledWith({
          type: CREATE_REQUEST_FAILED,
          payload: { errorMessage: 'an api error' }
        });
      });

      test('should handle all other errors', async () => {
        mockSendRequestWithAuth.mockRejectedValueOnce(new Error('an error'));

        await createItemQrCode(mockUser as User, name, description)(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledTimes(2);
        expect(mockDispatch).toHaveBeenCalledWith({ type: CREATE_REQUEST });
        expect(mockDispatch).toHaveBeenCalledWith({
          type: CREATE_QR_CODE_GENERATION_FAILED,
          payload: { errorMessage: 'an error' }
        });
      });
    });
  });
});
