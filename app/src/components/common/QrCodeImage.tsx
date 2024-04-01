import classNames from 'classnames';
import './QrCodeImage.scss';

export type QrCodeImageProps = {
  dataUri: string;
  className?: string;
  alt?: string;
};

export default function QrCodeImage(props: QrCodeImageProps) {
  return (
    <img
      className={classNames('qr-code-image', props.className)}
      alt={props.alt || 'QR Code Image'}
      src={props.dataUri}
    />
  );
}
