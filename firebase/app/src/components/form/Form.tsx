import './Form.scss';

import { ChangeEvent, FormEventHandler, ReactNode } from 'react';
import FormInput from './FormInput';
import FormAction from './FormAction';

export type FormInputChangeEventHander = (
  value: string,
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export type AdditionalProps = { [name: string]: unknown };

export type FormProps = {
  /** Explicit additional props */
  additionalProps?: AdditionalProps;
  children: ReactNode;
  id?: string;

  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export default function Form(props: FormProps) {
  const { children, additionalProps, onSubmit } = props;

  // todo - add in section containers to group and style form
  //        input and actions
  // i.e. <Form.Fields>...</Form.Fields>
  // i.e. <Form.Actions>...</Form.Actions>

  return (
    <form className="form" onSubmit={onSubmit} {...additionalProps}>
      {children}
    </form>
  );
}

Form.Input = FormInput;
Form.Action = FormAction;
