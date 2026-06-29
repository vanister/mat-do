import { describe, expect, test, beforeEach, vi, type Mock } from 'vitest';
import { User } from 'firebase/auth';
import { sendRequestWithAuth } from '../../utilities/api';
import { generateDataUri } from '../../utilities/qrcode-generator';
import { INFO_HASH_KEY, toScannableItemUrl } from '../../utilities/item-util';
import {
  CREATE_QR_CODE_GENERATED,
  CREATE_QR_CODE_GENERATING,
  CREATE_QR_CODE_GENERATION_FAILED,
  createItemQrCode
} from './actions';

vi.mock('../../utilities/qrcode-generator');
vi.mock('../../utilities/item-util');
vi.mock('../../utilities/api', () => ({
  sendRequestWithAuth: vi.fn()
}));

describe('Create Actions', () => {
  const uid = 'unique-user-id';
  const accessToken = 'an.access.token';
  const mockSendRequestWithAuth = sendRequestWithAuth as Mock;
  const mockGenerateDatauri = generateDataUri as Mock;
  const mockToScannableItemUrl = toScannableItemUrl as Mock;
  const mockDispatch = vi.fn();
  const mockGetIdToken = vi.fn();

  const mockUser: Partial<User> = {
    uid,
    getIdToken: mockGetIdToken
  };

  describe('WHEN creating an item', () => {
    const name = 'Blaster';
    const description = 'The one she stole from Cassian';

    beforeEach(() => {
      vi.clearAllMocks();
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

      expect(mockDispatch).toHaveBeenCalledWith({ type: CREATE_QR_CODE_GENERATING });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: CREATE_QR_CODE_GENERATED,
        payload: { dataUri, id: itemId }
      });
    });

    describe('AND there are errors', () => {
      test('should handle all other errors', async () => {
        mockSendRequestWithAuth.mockRejectedValueOnce(new Error('an error'));

        await createItemQrCode(mockUser as User, name, description)(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledWith({
          type: CREATE_QR_CODE_GENERATION_FAILED,
          payload: { errorMessage: 'an error' }
        });
      });
    });
  });
});
