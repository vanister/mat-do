import { toDataURL } from 'qrcode';

export type QrCodeOptions = {
  errorCorrection: 'H' | 'M' | 'L';
  scale: number;
  type: 'image/jpeg' | 'image/png';
};

export async function generateDataUri(data: string, options?: QrCodeOptions) {
  if (!data) {
    throw new Error('data is required');
  }

  const dataUriOptions: QrCodeOptions = options ?? {
    scale: 10,
    errorCorrection: 'H',
    type: 'image/jpeg'
  };

  const dataUri = await toDataURL(data, dataUriOptions);

  return dataUri;
}
