import './ItemDetails.scss';

import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import { Item } from '../../models/item';
import Loading from '../../components/loading/Loading';
import { Timestamp } from 'firebase/firestore';
import Form from '../../components/form/Form';
import FormInput from '../../components/form/FormInput';
import FormAction from '../../components/form/FormAction';
import useItemDetails from '../../hooks/useItemDetails.1';

type ItemForm = {
  name: string;
  description: string;
  found: boolean;
  scanned?: number;
  lastScanned?: string;
};

export default function ItemDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { item, saving, loading, error, saveChanges } = useItemDetails(id);
  const [itemForm, setItemForm] = useState<ItemForm>({
    name: '',
    description: '',
    found: false
  });

  useEffect(() => {
    if (loading || !item) {
      return;
    }

    // copy the item over to the form
    setItemForm({
      name: item.name,
      description: item.description,
      found: !!item.found,
      scanned: item.scanned ?? 0,
      lastScanned: item.lastScanned
        ? Timestamp.fromMillis(item.lastScanned._seconds * 1000)
            .toDate()
            .toLocaleString()
        : 'Never'
    });
  }, [item, loading]);

  useLayoutEffect(() => {
    // todo -temp
    alert(error.message);
  }, [error]);

  const handleValueChange = (field: string, value: string | boolean) => {
    setItemForm((s) => ({ ...s, [field]: value }));
  };

  const handleCancelClick = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  const handleFormSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      await saveChanges(itemForm as Item);
    },
    [saveChanges, itemForm]
  );

  return (
    <div className="item-page">
      <Title>Item Details</Title>

      {loading ? (
        <Loading />
      ) : (
        <Form onSubmit={handleFormSubmit}>
          <FormInput
            id="nameField"
            label="Name"
            value={itemForm.name}
            onChange={(value) => handleValueChange('name', value)}
            additionalProps={{ placeholder: `Jyn's Blaster`, required: true }}
          />
          <FormInput
            id="descField"
            label="Description"
            value={itemForm.description}
            multiline
            onChange={(value) => handleValueChange('description', value)}
          />
          <FormInput
            label="Found"
            type="checkbox"
            additionalProps={{ checked: itemForm.found }}
            onChange={(_, event) =>
              handleValueChange('found', (event.target as HTMLInputElement).checked)
            }
          />
          <FormInput label="Number of times scanned" value={itemForm.scanned.toString()} readOnly />
          <FormInput label="Last scanned" readOnly value={itemForm.lastScanned} />
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
