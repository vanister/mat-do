import './QrCodeImage.scss';

export type QrCodeImageProps = {
  dataUri: string;
  className?: string;
  alt?: string;
};

export default function QrCodeImage(props: QrCodeImageProps) {
  return (
    <img
      className={props.className || 'qr-code-image'}
      alt={props.alt || 'QR Code Image'}
      src={props.dataUri}
    />
  );
}
