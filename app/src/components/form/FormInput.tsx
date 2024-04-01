import { AdditionalProps, FormInputChangeEventHander } from './Form';

export type FormInputProps = {
  additionalProps?: AdditionalProps;
  id?: string;
  label: string;
  multiline?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  value?: string;

  onChange?: FormInputChangeEventHander;
};

export default function FormInput(props: FormInputProps) {
  const { id, label, value, readOnly, multiline, placeholder, type, required, onChange } = props;
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
