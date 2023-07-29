import './ItemDetails.scss';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import { Item } from '../../models/item';
import { useItemService } from '../../hooks/services/useItemService';
import Loading from '../../components/loading/Loading';
import { Timestamp } from 'firebase/firestore';
import { useErrorBoundary } from 'react-error-boundary';
import Form from '../../components/form/Form';
import FormInput from '../../components/form/FormInput';
import FormAction from '../../components/form/FormAction';

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
  }, []);

  function handleValueChange(field: string, value: string | boolean) {
    setItem({ ...item, [field]: value });
  }

  function handleCancelClick() {
    navigate('/dashboard');
  }

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

      <Form onSubmit={handleFormSubmit}>
        <FormInput
          id="nameField"
          label="Name"
          value={item.name}
          onChange={(value) => handleValueChange('name', value)}
          additionalProps={{ placeholder: `Jyn's Blaster`, required: true }}
        />
        <FormInput
          id="descField"
          label="Description"
          value={item.description}
          multiline
          onChange={(value) => handleValueChange('description', value)}
        />
        <FormInput
          label="Found"
          onChange={(_, event) =>
            handleValueChange(
              'found',
              (event.target as HTMLInputElement).checked
            )
          }
        />
        <FormInput
          label="Number of times scanned"
          value={item.scanned.toString()}
          readOnly
        />
        <FormInput
          label="Last scanned"
          readOnly
          value={
            item.lastScanned
              ? Timestamp.fromMillis(item.lastScanned._seconds * 1000)
                  .toDate()
                  .toLocaleString()
              : 'Never'
          }
        />
        <FormAction
          type="submit"
          additionalProps={{ disabled: isSaving || !item?.name }}
        >
          {isSaving ? 'Saving...' : 'Update'}
        </FormAction>
        <FormAction type="button" onClick={handleCancelClick}>
          Cancel
        </FormAction>
      </Form>
    </div>
  );
}
