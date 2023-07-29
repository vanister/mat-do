import React from 'react';
import { AdditionalProps } from './Form';

export type FormActionProps = {
  id?: string;
  children: string;
  type: 'button' | 'submit';
  additionalProps?: AdditionalProps;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function FormAction(props: FormActionProps) {
  const { id, children, type, onClick } = props;
  const additionalProps = props.additionalProps ?? {};

  return (
    <button
      className="form-action"
      key={id}
      id={id}
      type={type}
      onClick={onClick}
      {...additionalProps}
    >
      {children}
    </button>
  );
}
