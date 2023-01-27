import React, { useState } from 'react';
import { toDataURL } from 'qrcode';
import Title from '../Title';

import './Create.scss';

export default function Create() {
  // todo - useReducer
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>();
  const [qrCreated, setQrCreated] = useState(false);

  const handleQrCreate = async (e: React.FormEvent, data: string) => {
    e.preventDefault();

    if (!data) {
      return;
    }

    try {
      // create the qr code image from the data
      setQrCreated(false);
      // todo - move into utilities and return a json string
      const dataUrl = await toDataURL(data, {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        scale: 10,
      });

      setQrDataUrl(dataUrl);
      setQrCreated(true);
    } catch (error) {
      console.error('Error generating QR Code:', error);
      setQrCreated(false);
    }
  };

  const handleClearClick = () => {
    setQrCreated(false);
    setQrDataUrl('');
    setName('');
  };

  return (
    <div className="create-page">
      <Title>Create an Item</Title>
      <section className="create-page-content">
        {/* todo - make qr code image component */}
        {qrCreated && <img className="qrImage" src={qrDataUrl} alt="QR Code" />}
        <form
          className="qr-code-form"
          onSubmit={(e) => {
            handleQrCreate(e, name);
          }}
        >
          <div className="form-field">
            <label htmlFor="qrData">Name:</label>
            <input
              id="qrData"
              placeholder="Qr Code text..."
              type="text"
              value={name}
              maxLength={60}
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setDesc(e.target.value)}
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
