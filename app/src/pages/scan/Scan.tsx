import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useScannedInfo from '../../hooks/useScannedInfo';

import './Scan.scss';
import Title from '../../components/Title';

export default function Scan() {
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false);
  const [comments, setComments] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const item = useScannedInfo();

  function handleCommentFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    // todo - post the id + comments and location to /scan endpoint
  }

  function handleCommentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setComments(e.target.value);
  }

  return (
    <div className="scan-page">
      <Title>Scanned Item</Title>

      <form id="commentForm" onSubmit={handleCommentFormSubmit}>
        <div className="form-field">
          <label className="field-title">Name</label>
          <div className='field-input'>
            {item?.name || <span>Could not read the <em>name</em> field</span>}
          </div>
        </div>
        <div className="form-field">
          <label className="field-title">Description</label>
          <div className='field-input'>
            {item?.description || <span>No <em>description</em> provided</span>}
          </div>
        </div>
        <div className='form-field'>
          <label className="field-title">
            Use current location
          </label>
          <input
            className='field-input'
            type="checkbox"
            checked={useCurrentLocation}
            onChange={() => setUseCurrentLocation(!useCurrentLocation)} />
        </div>
        <div className='form-field'>
          <label className='field-title' htmlFor="commentField">
            Comments
          </label>
          <div className='field-input'>
            <textarea
              placeholder="Brief description of where you found it..."
              id="commentField"
              rows={4}
              maxLength={200}
              value={comments}
              onChange={handleCommentChange}>
            </textarea>
          </div>
        </div>
        <div className="actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
