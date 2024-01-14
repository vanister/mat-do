import './Create.scss';

import { useCallback, useLayoutEffect } from 'react';
import Title from '../../components/Title';
import QrCodeImage from '../../components/common/QrCodeImage';
import { INITIAL_CREATE_STATE, createReducer } from './reducer';
import { createItemQrCode, init, updateDescription, updateName, validationFailed } from './actions';
import Form from '../../components/form/Form';
import { useUser } from 'reactfire';
import { useThunkReducer } from '../../hooks/useThunkReducer';

export default function Create() {
  const { data: user } = useUser();
  const [state, dispatch] = useThunkReducer(createReducer, INITIAL_CREATE_STATE);
  const { errorMessage: error, name, description, created: qrCreated, dataUri } = state;

  useLayoutEffect(() => {
    if (!!error) {
      // todo - replace with modal or something other than a blocking alert
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

      await dispatch(createItemQrCode(user, name, description));
    },
    [description, dispatch, name, user]
  );

  return (
    <section className="create-page">
      <Title>Create an Item</Title>
      <div className="create-page-content">
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
            value={description}
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
              dispatch(init());
            }}
          >
            Clear
          </Form.Action>
        </Form>
      </div>
    </section>
  );
}
