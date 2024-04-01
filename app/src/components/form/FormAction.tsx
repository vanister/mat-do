import { AdditionalProps } from './Form';

export type FormActionProps = {
  additionalProps?: AdditionalProps;
  children: string;
  disabled?: boolean;
  id?: string;
  type: 'button' | 'submit';

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
