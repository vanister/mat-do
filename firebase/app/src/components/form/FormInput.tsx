import React from 'react';
import { AdditionalProps, FormInputChangeEventHander } from './Form';

export type FormInputProps = {
  id?: string;
  label: string;
  value?: string;
  readOnly?: boolean;
  multiline?: boolean;
  additionalProps?: AdditionalProps;
  onChange?: FormInputChangeEventHander;
};

export default function FormInput(props: FormInputProps) {
  const { id, label, value, onChange, readOnly, multiline } = props;
  const additionalProps = props.additionalProps ?? {};

  let input: JSX.Element;

  if (readOnly) {
    input = <span className="field-input readonly" {...additionalProps}></span>;
  } else if (multiline) {
    input = (
      <textarea
        id={id}
        className="field-input"
        value={value}
        rows={6}
        onChange={(e) => {
          onChange && onChange(e.target.value, e);
        }}
        {...additionalProps}
      />
    );
  } else {
    input = (
      <input
        id={id}
        className="field-input"
        value={value}
        type="text"
        onChange={(e) => {
          onChange && onChange(e.target.value, e);
        }}
        {...additionalProps}
      />
    );
  }

  return (
    <div className="form-field">
      <label className="field-title" htmlFor={id}>
        {label}
      </label>
      <div className="field-input-container">{input}</div>
    </div>
  );
}
