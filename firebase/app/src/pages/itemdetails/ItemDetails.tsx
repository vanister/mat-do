import './ItemDetails.scss';

import React, { useCallback, useEffect, useState } from 'react';
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

export type ItemDetailState = {
  loading: boolean;
  saving: boolean;
  item?: Item;
};

export default function ItemDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const itemService = useItemService();
  const { showBoundary } = useErrorBoundary();
  const [state, setState] = useState<ItemDetailState>({ loading: true, saving: false });
  const { item, loading, saving } = state;

  useEffect(() => {
    itemService
      .get(id)
      .then((item) => setState((s) => ({ ...s, item, loading: false })))
      .catch((error) => {
        setState((s) => ({ ...s, loading: false }));
        showBoundary(error);
      });
  }, [id, itemService, showBoundary]);

  const handleValueChange = (field: string, value: string | boolean) => {
    setState((s) => {
      const updatedItem = { ...s.item, [field]: value } as Item;

      return { ...s, item: updatedItem };
    });
  };

  const handleCancelClick = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  const handleFormSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      try {
        setState((s) => ({ ...s, saving: true }));

        await itemService.update(item);
      } catch (error) {
        console.error(error);
        alert('There was an error updating the item, please try again.');
      } finally {
        setState((s) => ({ ...s, saving: false }));
      }
    },
    [item, itemService]
  );

  return (
    <div className="item-page">
      <Title>Item Details</Title>

      {loading || !item ? (
        <Loading />
      ) : (
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
              handleValueChange('found', (event.target as HTMLInputElement).checked)
            }
          />
          <FormInput label="Number of times scanned" value={item.scanned.toString()} readOnly />
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
          <FormAction type="submit" additionalProps={{ disabled: saving || !item?.name }}>
            {saving ? 'Saving...' : 'Update'}
          </FormAction>
          <FormAction type="button" onClick={handleCancelClick}>
            Cancel
          </FormAction>
        </Form>
      )}
    </div>
  );
}
