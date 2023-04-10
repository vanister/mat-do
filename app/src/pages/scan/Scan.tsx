import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import { useScannedInfo } from '../../hooks/useScannedInfo';
import { ItemCoordinates, ScannedItem } from '../../models/scan';
import { getCurrentLocation } from '../../utilities/geolocation-util';
import { useScanService } from '../../hooks/services/useScanService';
import Form, { FormField } from '../../components/form/Form';

import './Scan.scss';

export default function Scan() {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [comments, setComments] = useState<string>();
  const [itemCoordinates, setItemCoordinates] = useState<ItemCoordinates>();
  const { id: itemId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = useScannedInfo();
  const scanService = useScanService();

  useEffect(() => {
    if (useCurrentLocation) {
      getCurrentLocation(navigator.geolocation)
        .then((coords) => {
          setItemCoordinates(coords);
        })
        .catch(() => {
          alert('Unable to access current location.');
          setUseCurrentLocation(false);
        });
    } else {
      setItemCoordinates(null);
    }
  }, [useCurrentLocation]);

  const fields: FormField[] = useMemo(
    () => [
      {
        name: 'nameField',
        label: 'Name',
        value: item?.name ?? 'Could not read the "name" field',
        readOnly: true
      },
      {
        name: 'descriptionField',
        label: 'Description',
        value: item?.description ?? 'No "description" provided',
        readOnly: true
      },
      {
        name: 'useLocationField',
        label: 'Use current location',
        type: 'checkbox',
        additionalProps: { checked: useCurrentLocation },
        onChange: () => {
          setUseCurrentLocation(!useCurrentLocation);
        }
      },
      {
        name: 'commentsField',
        label: 'Comments',
        value: comments,
        required: true,
        textArea: true,
        placeholder: 'Brief description of where you found it..',
        additionalProps: { rows: 4, maxLength: 200 },
        onChange: (value: string) => setComments(value)
      }
    ],
    [comments, item?.description, item?.name, useCurrentLocation]
  );

  async function handleCommentFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    const scan: ScannedItem = {
      itemId,
      comments,
      coordinates: itemCoordinates,
      scannedAt: new Date().toISOString()
    };

    await scanService.scan(scan);

    navigate('/thankyou', { replace: true });
  }

  return (
    <div className="scan-page">
      <Title>Scanned Item</Title>
      <Form
        id="commentForm"
        fields={fields}
        onSubmit={handleCommentFormSubmit}
      />
    </div>
  );
}
