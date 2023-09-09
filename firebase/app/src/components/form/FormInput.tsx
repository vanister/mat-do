import React from 'react';
import { AdditionalProps, FormInputChangeEventHander } from './Form';

export type FormInputProps = {
  id?: string;
  label: string;
  value?: string;
  readOnly?: boolean;
  multiline?: boolean;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  additionalProps?: AdditionalProps;
  onChange?: FormInputChangeEventHander;
};

export default function FormInput(props: FormInputProps) {
  const {
    id,
    label,
    value,
    readOnly,
    multiline,
    placeholder,
    type,
    required,
    onChange
  } = props;
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
            required={required}
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
            type={type ?? 'text'}
            placeholder={placeholder}
            readOnly={readOnly}
            required={required}
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
