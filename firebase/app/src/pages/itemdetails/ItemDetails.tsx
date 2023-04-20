import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import { Item } from '../../models/item';
import { useItemService } from '../../hooks/services/useItemService';
import Loading from '../../components/loading/Loading';
import Form, { FormAction, FormField } from '../../components/form/Form';
import { Timestamp } from 'firebase/firestore';
import { useErrorBoundary } from 'react-error-boundary';

import './ItemDetails.scss';

export default function ItemDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item>();
  const [isSaving, setIsSaving] = useState(false);
  const itemService = useItemService();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    itemService
      .get(id)
      .then((item) => setItem(item))
      .catch((error) => showBoundary(error));
  }, [id]);

  const fields: FormField[] = useMemo(() => {
    if (!item) {
      return [];
    }

    return [
      {
        name: 'nameField',
        label: 'Name',
        placeholder: `Jyn's blaster`,
        value: item?.name,
        required: true,
        onChange: (value) => {
          setItem({ ...item, name: value });
        }
      },
      {
        name: 'descriptionField',
        label: 'Description',
        placeholder: 'The one she stole from Cassian...',
        value: item?.description,
        onChange: (value) => setItem({ ...item, description: value })
      },
      {
        name: 'foundField',
        type: 'checkbox',
        label: 'Found'
      },
      {
        name: 'scannedField',
        label: 'Number of times scanned',
        value: item.scanned.toString(),
        readOnly: true
      },
      {
        name: 'lastScannedField',
        label: 'last scanned',
        value: item.lastScanned
          ? // todo - move to util
            Timestamp.fromMillis(item.lastScanned._seconds * 1000)
              .toDate()
              .toLocaleString()
          : 'Never scanned',
        readOnly: true
      }
    ];
  }, [item]);

  const actions: FormAction[] = [
    {
      type: 'submit',
      text: isSaving ? 'Saving...' : 'Update',
      disabled: isSaving || !item?.name
    },
    {
      type: 'button',
      text: 'Cancel',
      onAction: () => navigate('/dashboard')
    }
  ];

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsSaving(true);

      await itemService.update(item);
    } catch (error) {
      console.error(error);
      alert('There was an error updating the item, please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  if (!item) {
    return <Loading />;
  }

  return (
    <div className="item-page">
      <Title>Item Details</Title>
      <Form
        id="itemForm"
        fields={fields}
        actions={actions}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
