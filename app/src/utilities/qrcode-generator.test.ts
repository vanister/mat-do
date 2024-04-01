import { beforeEach, describe, expect, test } from '@jest/globals';
import { generateDataUri, QrCodeOptions } from './qrcode-generator';
import { toDataURL } from 'qrcode';

jest.mock('qrcode');

describe('QrCode Generator', () => {
  const mockToDataUrl = toDataURL as jest.Mock;

  beforeEach(() => {
    mockToDataUrl.mockReturnValue('somedata-uri-for-a-qr-code');
  });

  test('should generate a QR Code with default options', async () => {
    const options: QrCodeOptions = {
      scale: 10,
      errorCorrection: 'H',
      type: 'image/jpeg'
    };

    const dataUri = await generateDataUri('unit-test-item');

    expect(dataUri).toBeDefined();
    expect(mockToDataUrl).toHaveBeenCalledWith('unit-test-item', options);
  });

  test('should generate a QR Code with options', async () => {
    const options: QrCodeOptions = {
      type: 'image/png',
      scale: 5,
      errorCorrection: 'L'
    };

    const dataUri = await generateDataUri('unit-test-item', options);

    expect(dataUri).toBeDefined();
    expect(mockToDataUrl).toHaveBeenCalledWith('unit-test-item', options);
  });
});
