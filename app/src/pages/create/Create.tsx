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

const initialState: CreateState = {
  created: false,
  name: '',
  description: ''
};

export default function Create() {
  const [state, dispatch] = useReducer(createReducer, initialState);
  const { error, name, description: desc, created: qrCreated, dataUri } = state;
  const generateQrCode = generate(dispatch);

  const handleQrCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      dispatch(validationFailed('A name is required'));
      return;
    }

    await generateQrCode(name, desc);
  };

  const handleClearClick = () => {
    dispatch(init);
  };

  return (
    <div className="create-page">
      <Title>Create an Item</Title>
      <section className="create-page-content">
        {qrCreated && <QrCodeImage dataUri={dataUri} />}
        <form className="qr-code-form" onSubmit={handleQrCreate}>
          {error && <div className="form-errors">{error}</div>}
          <div className="form-field">
            <label htmlFor="qrData">Name:</label>
            <input
              id="qrData"
              placeholder="Qr Code text..."
              type="text"
              value={name}
              maxLength={60}
              onChange={(e) => dispatch(updateName(e.target.value))}
            />
          </div>
          <div className="form-field">
            <label htmlFor="qrDesc">Description:</label>
            <input
              id="qrDesc"
              placeholder="Description of the item..."
              type="text"
              value={desc}
              maxLength={140}
              onChange={(e) => dispatch(updateDescription(e.target.value))}
            />
          </div>
          <div className="form-buttons">
            <button id="createButton" type="submit">
              Create
            </button>
            <button type="button" id="clearButton" onClick={handleClearClick}>
              Clear
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
