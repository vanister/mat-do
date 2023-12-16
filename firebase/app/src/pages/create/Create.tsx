import './Create.scss';

import React, { useLayoutEffect } from 'react';
import Title from '../../components/Title';
import QrCodeImage from '../../components/common/QrCodeImage';
import { createReducer } from './reducer';
import { generateQrCode, init, updateDescription, updateName, validationFailed } from './actions';
import { CreateState } from './create-types';
import Form from '../../components/form/Form';
import { useUser } from 'reactfire';
import { useThunkReducer } from '../../hooks/useThunkReducer';

const INITIAL_CREATE_STATE: CreateState = {
  name: '',
  description: ''
};

export default function Create() {
  const { data: user } = useUser();
  const [state, dispatch] = useThunkReducer(createReducer, INITIAL_CREATE_STATE);
  const { error, name, description: desc, created: qrCreated, dataUri } = state;

  useLayoutEffect(() => {
    if (!!error) {
      // todo - replace with modal or something other than a blocking alert
      alert(error);
    }
  }, [error]);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name) {
      dispatch(validationFailed('A name is required'));
      return;
    }

    dispatch(generateQrCode(user, name, desc));
  }

  return (
    <div className="create-page">
      <Title>Create an Item</Title>
      <section className="create-page-content">
        {qrCreated && <QrCodeImage dataUri={dataUri} />}

        <Form onSubmit={handleFormSubmit}>
          <Form.Input
            id="nameField"
            label="Name"
            value={name}
            onChange={(value) => {
              dispatch(updateName(value));
            }}
            additionalProps={{ placeholder: `Jyn's Blaster`, required: true }}
          />
          <Form.Input
            id="descriptionField"
            label="Description"
            value={desc}
            multiline
            onChange={(value) => {
              dispatch(updateDescription(value));
            }}
            additionalProps={{ placeholder: `The one she stole from Cassian` }}
          />
          <Form.Action id="createButton" type="submit">
            Create
          </Form.Action>
          <Form.Action
            id="clearButton"
            type="button"
            onClick={() => {
              dispatch(init);
            }}
          >
            Clear
          </Form.Action>
        </Form>
      </section>
    </div>
  );
}
