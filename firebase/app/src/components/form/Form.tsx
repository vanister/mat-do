import './Form.scss';

import React from 'react';
import FormInput from './FormInput';
import FormAction from './FormAction';

export type FormInputChangeEventHander = (
  value: string,
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export type AdditionalProps = { [name: string]: unknown };

export type FormProps = {
  id?: string;
  children: React.ReactNode;
  additionalProps?: AdditionalProps;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

export default function Form(props: FormProps) {
  const { children, onSubmit } = props;

  // todo - add in section containers to group and style form
  //        input and actions
  // i.e. <Form.Fields>...</Form.Fields>
  // i.e. <Form.Actions>...</Form.Actions>

  return (
    <form className="form" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

Form.Input = FormInput;
Form.Action = FormAction;
