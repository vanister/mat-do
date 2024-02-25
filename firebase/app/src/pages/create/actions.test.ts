import { describe, expect, test, beforeEach } from '@jest/globals';
import { User } from 'firebase/auth';
import { sendRequestWithAuth } from '../../utilities/api';
import { generateDataUri } from '../../utilities/qrcode-generator';
import { INFO_HASH_KEY, toScannableItemUrl } from '../../utilities/item-util';
import { createItemQrCode } from './actions';

jest.mock('../../utilities/qrcode-generator');
jest.mock('../../utilities/item-util');

jest.mock('axios', () => ({
  AxiosError: class AxiosError extends Error {}
}));

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
    beforeEach(() => {
      jest.clearAllMocks();
    });

    beforeEach(() => {
      mockGetIdToken.mockResolvedValueOnce(accessToken);
    });

    test('should save the item and create a qr code data uri', async () => {
      const itemId = 'new-item-uuid';
      const name = 'Blaster';
      const description = 'The one she stole from Cassian';

      mockSendRequestWithAuth.mockResolvedValueOnce({ data: itemId });
      mockGenerateDatauri.mockResolvedValueOnce('data:image/png;base64,aBase64EncodedItem');
      mockToScannableItemUrl.mockReturnValueOnce(
        `https://mat-do.com/scan/${itemId}#${INFO_HASH_KEY}=aBase64EncodedItem`
      );

      await createItemQrCode(mockUser as User, name, description)(mockDispatch);

      expect(mockSendRequestWithAuth).toHaveBeenCalledWith('/items', accessToken, {
        method: 'POST',
        data: { name, description, userId: uid }
      });
    });
  });
});
