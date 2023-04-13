import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../../components/Title';
import { Item } from '../../models/item';
import { useItemService } from '../../hooks/services/useItemService';
import Loading from '../../components/loading/Loading';
import Form, { FormAction, FormField } from '../../components/form/Form';
import { Timestamp } from 'firebase/firestore';

import './ItemDetails.scss';

export default function ItemDetails() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item>();
  const itemService = useItemService();

  useEffect(() => {
    itemService
      .get(id)
      .then((item) => setItem(item))
      .catch((_) => {
        alert('Failed fetching the item');
      });
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
          : '',
        readOnly: true
      }
    ];
  }, [item]);

  const actions: FormAction[] = [
    { type: 'submit', text: 'Update', disabled: !item?.name }
  ];

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    alert('TODO');
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
