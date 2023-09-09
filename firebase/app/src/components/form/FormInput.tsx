import React from 'react';
import { AdditionalProps, FormInputChangeEventHander } from './Form';

export type FormInputProps = {
  id?: string;
  label: string;
  value?: string;
  readOnly?: boolean;
  multiline?: boolean;
  placeholder?: string;
  additionalProps?: AdditionalProps;
  onChange?: FormInputChangeEventHander;
};

export default function FormInput(props: FormInputProps) {
  const { id, label, value, onChange, readOnly, multiline, placeholder } =
    props;
  const additionalProps = props.additionalProps ?? {};

  return (
    <div className="form-field">
      <label className="field-title" htmlFor={id}>
        {label}
      </label>
      <div className="field-input-container">
        {multiline ? (
          <textarea
            id={id}
            className="field-input"
            value={value}
            rows={6}
            placeholder={placeholder}
            readOnly={readOnly}
            onChange={(e) => {
              onChange && onChange(e.target.value, e);
            }}
            {...additionalProps}
          />
        ) : (
          <input
            id={id}
            className="field-input"
            value={value}
            type="text"
            placeholder={placeholder}
            readOnly={readOnly}
            onChange={(e) => {
              onChange && onChange(e.target.value, e);
            }}
            {...additionalProps}
          />
        )}
      </div>
    </div>
  );
}
