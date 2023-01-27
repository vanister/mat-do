import React, { useReducer } from 'react';
import { toDataURL } from 'qrcode';
import { v4 as uuid } from 'uuid';
import Title from '../Title';
import QrCodeImage from '../common/QrCodeImage';

import './Create.scss';
import { createReducer } from './reducer';
import { failed, generate, init, updateDesc, updateName } from './actions';
import { CreateState, Item } from './create-types';

const initialState: CreateState = {
  created: false,
  name: '',
  desc: '',
  id: uuid()
};

export default function Create() {
  const [state, dispatch] = useReducer(createReducer, initialState);
  const { name, desc, created: qrCreated, id, dataUri } = state;
  const generateQrCode = generate(dispatch);

  const handleQrCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      return;
    }

    try {
      // create the qr code image from the data
      generateQrCode();

      // todo - move into utilities and return a json string
      const item: Item = {
        id,
        name,
        desc
      };

      const dataUri = await toDataURL(id, {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        scale: 10
      });

      generateQrCode(dataUri);
    } catch (error) {
      console.error('Error generating QR Code:', error);
      failed(dispatch)('Error generating QR Code');
    }
  };

  const handleClearClick = () => {
    init(dispatch)();
  };

  return (
    <div className="create-page">
      <Title>Create an Item</Title>
      <section className="create-page-content">
        {/* todo - make qr code image component */}
        {qrCreated && <QrCodeImage dataUri={dataUri} />}
        <form className="qr-code-form" onSubmit={handleQrCreate}>
          <div className="form-field">
            <label htmlFor="qrData">Name:</label>
            <input
              id="qrData"
              placeholder="Qr Code text..."
              type="text"
              value={name}
              maxLength={60}
              onChange={(e) => updateName(dispatch)(e.target.value)}
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
              onChange={(e) => updateDesc(dispatch)(e.target.value)}
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
