import React from 'react';

import './Form.scss';

export type FormField = {
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  className?: string;
  placeholder?: string;
  textArea?: boolean;
  readOnly?: boolean;
  required?: boolean;
  additionalProps?: { [name: string]: any };
  /**
   * Custom field function.
   *
   * NOTE: If this function is provided, it will take precedence.
   */
  fieldInput?: () => React.ReactNode;
  onChange?: (value: string) => void;
};

export type FormaActionType = 'submit' | 'button';

export type FormAction = {
  id?: string;
  type: 'button' | 'submit';
  text: string;
  disabled?: boolean;
  /** Will only be called when type is not 'submit' */
  onAction?: React.MouseEventHandler;
};

export type FormProps = {
  id: string;
  fields: FormField[];
  actions?: FormAction[];
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function Form(props: FormProps) {
  const actions = props.actions ?? [{ type: 'submit', text: 'Save' }];

  function handleActionClick(action: FormAction, event: React.MouseEvent) {
    if (action.type === 'button') {
      action.onAction(event);
    }
  }

  return (
    <form className="form" id={props.id} onSubmit={props.onSubmit}>
      {props.fields.map((field, idx) => {
        const labelField = (
          <label className="field-title" htmlFor={field.name}>
            {field.label}
          </label>
        );

        if (typeof field.fieldInput === 'function') {
          return (
            <>
              {labelField}
              {field.fieldInput()}
            </>
          );
        }

        const className = `field-input ${field.className ?? ''}`.trim();
        const { name, placeholder, required, readOnly, value, type } = field;
        const additionalProps = field.additionalProps ?? {};
        const onChange = (e) => field.onChange?.call(null, e.target.value);

        return (
          <div key={`${name}-${idx}`} className="form-field">
            {labelField}
            <div className="field-input-container">
              {field.textArea ? (
                <textarea
                  id={name}
                  className={className}
                  placeholder={placeholder}
                  required={!!required}
                  readOnly={!!readOnly}
                  value={value}
                  onChange={onChange}
                  {...additionalProps}
                />
              ) : (
                <input
                  id={name}
                  className={className}
                  type={type ?? 'text'}
                  placeholder={placeholder}
                  required={!!required}
                  readOnly={!!readOnly}
                  value={value}
                  onChange={onChange}
                  {...additionalProps}
                />
              )}
            </div>
          </div>
        );
      })}
      <div className="actions">
        {actions.map((action, idx) => {
          const id = action.id ?? `action${idx}`;

          return (
            <button
              key={id}
              id={id}
              type={action.type}
              disabled={action.disabled}
              onClick={(e) => handleActionClick(action, e)}
            >
              {action.text}
            </button>
          );
        })}
      </div>
    </form>
  );
}
