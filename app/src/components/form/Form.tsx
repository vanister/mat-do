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
  onChange?: (value: string) => void;
};

export type FormaActionType = 'submit' | 'button';

export type FormAction = {
  id?: string;
  type: 'button' | 'submit';
  text: string;
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
      {props.fields.map((field, idx) => (
        <div key={`${field.name}-${idx}`} className="form-field">
          <label className="field-title" htmlFor={field.name}>
            {field.label}
          </label>
          <input
            id={field.name}
            className={`field-input ${field.className}`}
            type={field.type ?? 'text'}
            placeholder={field.placeholder}
            required={!!field.required}
            readOnly={!!field.readOnly}
            value={field.value}
            onChange={(e) => field.onChange?.call(null, e.target.value)}
          />
        </div>
      ))}
      <div className="actions">
        {actions.map((action, idx) => {
          const id = action.id ?? `action${idx}`;

          return (
            <button
              key={id}
              id={id}
              type={action.type}
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
