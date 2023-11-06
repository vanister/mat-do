import './Create.scss';

import React, { useCallback, useLayoutEffect } from 'react';
import Title from '../../components/Title';
import QrCodeImage from '../../components/common/QrCodeImage';
import { createReducer } from './reducer';
import {
  generateQrCode,
  init,
  updateDescription,
  updateName,
  validationFailed
} from './actions';
import { CreateState } from './create-types';
import Form from '../../components/form/Form';
import FormInput from '../../components/form/FormInput';
import FormAction from '../../components/form/FormAction';
import { useUser } from 'reactfire';
import { useThunkReducer } from '../../hooks/useThunkReducer';

const initialState: CreateState = {
  created: false,
  name: '',
  description: ''
};

export default function Create() {
  const { data: user } = useUser();
  const [state, dispatch] = useThunkReducer(createReducer, initialState);
  const { error, name, description: desc, created: qrCreated, dataUri } = state;

  useLayoutEffect(() => {
    if (!!error) {
      alert(error);
    }
  }, [error]);

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!name) {
        dispatch(validationFailed('A name is required'));
        return;
      }

      dispatch(generateQrCode(user, name, desc));
    },
    [desc, dispatch, name, user]
  );

  return (
    <div className="create-page">
      <Title>Create an Item</Title>
      <section className="create-page-content">
        {qrCreated && <QrCodeImage dataUri={dataUri} />}

        <Form onSubmit={handleFormSubmit}>
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
