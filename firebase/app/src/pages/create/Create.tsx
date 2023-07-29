import './Create.scss';

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
import Form from '../../components/form/Form';
import FormInput from '../../components/form/FormInput';
import FormAction from '../../components/form/FormAction';

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
        <Form>
          <FormInput
            id="nameField"
            label="Name"
            value={name}
            onChange={(value) => {
              dispatch(updateName(value));
            }}
            additionalProps={{ placeholder: `Jyn's Blaster`, required: true }}
          />
          <FormInput
            id="descriptionField"
            label="Description"
            value={desc}
            multiline
            onChange={(value) => {
              dispatch(updateDescription(value));
            }}
            additionalProps={{ placeholder: `The one she stole from Cassian` }}
          />
          <FormAction
            id="createButton"
            type="submit"
            onClick={handleFormSubmit}
          >
            Create
          </FormAction>
          <FormAction
            id="clearButton"
            type="button"
            onClick={() => {
              dispatch(init);
            }}
          >
            Clear
          </FormAction>
        </Form>
      </section>
    </div>
  );
}
