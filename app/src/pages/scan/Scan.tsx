import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../../components/Title';
import { useScannedInfo } from '../../hooks/useScannedInfo';
import { ItemCoordinates, ScannedItem } from '../../models/scan';
import { getCurrentLocation } from '../../utilities/geolocation-util';
import { useScanService } from '../../hooks/services/useScanService';

import './Scan.scss';

export default function Scan() {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [comments, setComments] = useState<string>();
  const [itemCoordinates, setItemCoordinates] = useState<ItemCoordinates>()
  const { id: itemId } = useParams<{ id: string }>();
  const item = useScannedInfo();
  const scanService = useScanService();

  useEffect(() => {
    if (useCurrentLocation) {
      getCurrentLocation(navigator.geolocation)
        .then(coords => {
          setItemCoordinates(coords);
        })
        .catch(() => {
          alert("Unable to access current location.");
          setUseCurrentLocation(false);
        });
    } else {
      setItemCoordinates(null);
    }
  }, [useCurrentLocation]);

  async function handleCommentFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    const scan: ScannedItem = {
      itemId,
      comments,
      coordinates: itemCoordinates,
      scannedAt: new Date().toISOString(),
    };

    await scanService.scan(scan);
  }

  async function handleUseCurrentLocationChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUseCurrentLocation(e.target.checked);
  }

  function handleCommentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setComments(e.target.value);
  }

  return (
    <div className="scan-page">
      <Title>Scanned Item</Title>
      {/* todo - consider making this a common form to share with create form */}
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
            onChange={handleUseCurrentLocationChange} />
        </div>
        <div className='form-field'>
          <label className='field-title' htmlFor="commentField">
            Comments
          </label>
          <div className='field-input'>
            <textarea
              placeholder="Brief description of where you found it..."
              id="commentField"
              required
              rows={4}
              maxLength={200}
              value={comments}
              onChange={handleCommentChange}>
            </textarea>
          </div>
        </div>
        <div className="actions">
          <button type="submit" disabled={!comments}>Submit</button>
        </div>
      </form>
    </div>
  );
}
