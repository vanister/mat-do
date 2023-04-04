import React, { useReducer } from 'react';
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

import './Create.scss';
import { useItemService } from '../../hooks/services/useItemService';

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

  async function handleQrCreate(e: React.FormEvent) {
    e.preventDefault();

    if (!name) {
      dispatch(validationFailed('A name is required'));
      return;
    }

    await generateQrCode(name, desc);
  }

  async function handleClearClick() {
    dispatch(init);
  }

  return (
    <div className="create-page">
      <Title>Create an Item</Title>
      <section className="create-page-content">
        {qrCreated && <QrCodeImage dataUri={dataUri} />}
        <form className="qr-code-form" onSubmit={handleQrCreate}>
          {error && <div className="form-errors">{error}</div>}
          <div className="form-field">
            <label className="field-title" htmlFor="itemName">Name:</label>
            <input
              id="itemName"
              placeholder="Qr Code text..."
              type="text"
              value={name}
              maxLength={60}
              required
              onChange={(e) => dispatch(updateName(e.target.value))}
            />
          </div>
          <div className="form-field">
            <label className="field-title" htmlFor="itemDesc">Description:</label>
            <input
              id="itemDesc"
              placeholder="Description of the item..."
              type="text"
              value={desc}
              maxLength={200}
              onChange={(e) => dispatch(updateDescription(e.target.value))}
            />
          </div>
          <div className="actions">
            <button id="createButton" type="submit">
              Create
            </button>
            <button id="clearButton" type="button" onClick={handleClearClick}>
              Clear
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
