import './Scan.scss';

import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import { useScannedInfo } from '../../hooks/useScannedInfo';
import { ItemCoordinates, ScannedItem } from '../../models/scan';
import { getCurrentLocation, getLatLongString } from '../../utilities/geolocation-util';
import { useScanService } from '../../hooks/services/useScanService';
import { Timestamp } from 'firebase/firestore';
import Form from '../../components/form/Form';
import FormInput from '../../components/form/FormInput';
import FormAction from '../../components/form/FormAction';
import { useStateObject } from '../../hooks/useStateObject';
import { useScan } from '../../hooks/useScan';

type ScanForm = {
  useCurrentLocation: boolean;
  fetchingCoords: boolean;
  comments: string;
  itemCoordinates?: ItemCoordinates;
};

const INITIAL_STATE: ScanForm = {
  useCurrentLocation: false,
  fetchingCoords: false,
  comments: ''
};

export default function Scan() {
  const { id: itemId } = useParams<{ id: string }>();

  // todo - use reducer
  const [state, setState] = useStateObject<ScanForm>(INITIAL_STATE);
  const { comments, fetchingCoords, useCurrentLocation, itemCoordinates } = state;
  const { saving, updateItem } = useScan();
  const navigate = useNavigate();
  const item = useScannedInfo();
  const scanService = useScanService();
  const coordString = useMemo(
    () => (itemCoordinates ? getLatLongString(itemCoordinates) : ''),
    [itemCoordinates]
  );

  useEffect(() => {
    if (!useCurrentLocation) {
      setState({ itemCoordinates: null });
      return;
    }

    async function getLocation() {
      try {
        setState({ fetchingCoords: true });

        const coords = await getCurrentLocation(navigator.geolocation);

        setState({ itemCoordinates: coords, fetchingCoords: false });
      } catch (error) {
        alert('Unable to access current location.');
        setState({ useCurrentLocation: false, fetchingCoords: false });
      }
    }

    getLocation();
  }, [setState, useCurrentLocation]);

  const handleCommentFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const scan: Partial<ScannedItem> = {
        itemId,
        comments,
        coordinates: itemCoordinates,
        scannedAt: Timestamp.now()
      };

      await scanService.scan(scan);

      navigate('/thankyou', { replace: true });
    },
    [itemId, navigate, scanService, comments, itemCoordinates]
  );

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
          onChange={() => setState((s) => ({ ...s, useCurrentLocation: !s.useCurrentLocation }))}
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
          onChange={(value) => setState({ comments: value })}
          additionalProps={{ rows: 4, maxLength: 200 }}
        />
        <FormAction type="submit" disabled={!comments || saving}>
          Share
        </FormAction>
      </Form>
    </div>
  );
}
