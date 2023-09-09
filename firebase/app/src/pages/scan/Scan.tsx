import './Scan.scss';

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import { useScannedInfo } from '../../hooks/useScannedInfo';
import { ItemCoordinates, ScannedItem } from '../../models/scan';
import {
  getCurrentLocation,
  getLatLongString
} from '../../utilities/geolocation-util';
import { useScanService } from '../../hooks/services/useScanService';
import { Timestamp } from 'firebase/firestore';
import Form from '../../components/form/Form';
import FormInput from '../../components/form/FormInput';
import FormAction from '../../components/form/FormAction';

export default function Scan() {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [fetchingCoords, setFetchingCoords] = useState(false);
  const [comments, setComments] = useState('');
  const [itemCoordinates, setItemCoordinates] = useState<ItemCoordinates>();
  const { id: itemId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = useScannedInfo();
  const scanService = useScanService();
  const coordString = useMemo(
    () => getLatLongString(itemCoordinates),
    [itemCoordinates]
  );

  useEffect(() => {
    if (useCurrentLocation) {
      setFetchingCoords(true);

      getCurrentLocation(navigator.geolocation)
        .then((coords) => {
          setItemCoordinates(coords);
        })
        .catch(() => {
          alert('Unable to access current location.');
          setUseCurrentLocation(false);
        })
        .finally(() => {
          setFetchingCoords(false);
        });
    } else {
      setItemCoordinates(null);
    }
  }, [useCurrentLocation]);

  async function handleCommentFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    const scan: Partial<ScannedItem> = {
      itemId,
      comments,
      coordinates: itemCoordinates,
      scannedAt: Timestamp.now()
    };

    await scanService.scan(scan);

    navigate('/thankyou', { replace: true });
  }

  return (
    <div className="scan-page">
      <Title>Scanned Item</Title>
      <Form id="commentForm" onSubmit={handleCommentFormSubmit}>
        <FormInput
          label="Name"
          value={item?.name ?? '[Could not read the "name" field]'}
          readOnly
        />
        <FormInput
          label="Description"
          value={item?.description ?? '[No description provided]'}
          readOnly
        />
        <FormInput
          label="Use current location"
          type="checkbox"
          onChange={() => setUseCurrentLocation(!useCurrentLocation)}
          additionalProps={{ checked: useCurrentLocation }}
        />
        <FormInput
          label="Recorded location"
          readOnly
          value={fetchingCoords ? 'Determining location...' : coordString}
        />
        <FormInput
          label="Comments"
          value={comments}
          required
          multiline
          placeholder="Brief description of where you found it..."
          onChange={(value) => setComments(value)}
          additionalProps={{ rows: 4, maxLength: 200 }}
        />
        <FormAction type="submit" disabled={!comments}>
          Share
        </FormAction>
      </Form>
    </div>
  );
}
