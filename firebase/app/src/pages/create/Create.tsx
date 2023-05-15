import React, { useLayoutEffect, useReducer } from 'react';
import Title from '../../components/Title';
import QrCodeImage from '../../components/common/QrCodeImage';
import { createReducer } from './reducer';
import {
  generate,
  init,
  updateDescription,
  updateName,
  validationFailed
} from './actions';
import { CreateState } from './create-types';
import { useItemService } from '../../hooks/services/useItemService';
import Form, { FormAction, FormField } from '../../components/form/FormOld';

import './Create.scss';

const initialState: CreateState = {
  created: false,
  name: '',
  description: ''
};

export default function Create() {
  const [state, dispatch] = useReducer(createReducer, initialState);
  const { error, name, description: desc, created: qrCreated, dataUri } = state;
  const itemService = useItemService();
  const generateQrCode = generate(dispatch, itemService);

  useLayoutEffect(() => {
    if (!!error) {
      alert(error);
    }
  }, [error]);

  const fields: FormField[] = [
    {
      name: 'name',
      label: 'Name',
      value: name,
      placeholder: `Jyn's blaster...`,
      required: true,
      onChange: (value) => {
        dispatch(updateName(value));
      }
    },
    {
      name: 'description',
      label: 'Description',
      value: desc,
      placeholder: 'The one she stole from Cassian...',
      onChange: (value) => {
        dispatch(updateDescription(value));
      }
    }
  ];

  const actions: FormAction[] = [
    { text: 'Create', type: 'submit' },
    {
      text: 'Clear',
      type: 'button',
      onAction: () => {
        dispatch(init);
      }
    }
  ];

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name) {
      dispatch(validationFailed('A name is required'));
      return;
    }

    await generateQrCode(name, desc);
  }

  return (
    <div className="create-page">
      <Title>Create an Item</Title>
      <section className="create-page-content">
        {qrCreated && <QrCodeImage dataUri={dataUri} />}
        <Form
          id="qrCodeForm"
          fields={fields}
          actions={actions}
          onSubmit={handleFormSubmit}
        />
      </section>
    </div>
  );
}
