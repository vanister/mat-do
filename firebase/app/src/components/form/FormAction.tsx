import { AdditionalProps } from './Form';

export type FormActionProps = {
  id?: string;
  children: string;
  type: 'button' | 'submit';
  disabled?: boolean;
  additionalProps?: AdditionalProps;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function FormAction(props: FormActionProps) {
  const { id, children, type, disabled, onClick } = props;
  const additionalProps = props.additionalProps ?? {};

  return (
    <button
      className="form-action"
      key={id}
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...additionalProps}
    >
      {children}
    </button>
  );
}
