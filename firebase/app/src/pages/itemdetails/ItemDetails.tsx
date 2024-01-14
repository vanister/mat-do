import './ItemDetails.scss';

import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from 'reactfire';
import Title from '../../components/Title';
import Loading from '../../components/loading/Loading';
import Form from '../../components/form/Form';
import FormInput from '../../components/form/FormInput';
import FormAction from '../../components/form/FormAction';
import { INITIAL_STATE, itemDetailReducer } from './reducer';
import { getItemDetails, toggleFound, updateDescription, updateItem, updateName } from './actions';
import { useThunkReducer } from '../../hooks/useThunkReducer';

export default function ItemDetails() {
  const { data: user } = useUser();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [state, dispatch] = useThunkReducer(itemDetailReducer, INITIAL_STATE);
  const { item, saving, loading, errorMessage } = state;

  useEffect(() => {
    const load = async () => {
      const accessToken = await user.getIdToken();

      await dispatch(getItemDetails(id, accessToken));
    };

    load();
  }, [dispatch, id, user]);

  useLayoutEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorMessage]);

  const handleCancelClick = () => {
    navigate('/dashboard');
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const accessToken = await user.getIdToken();

    await updateItem(item, accessToken)(dispatch);
  };

  return (
    <section className="item-page">
      <Title>Item Details</Title>

      {loading ? (
        <Loading />
      ) : (
        <Form onSubmit={handleFormSubmit}>
          <FormInput
            id="nameField"
            label="Name"
            value={item.name}
            onChange={(value) => dispatch(updateName(value))}
            additionalProps={{ placeholder: `Jyn's Blaster`, required: true }}
          />
          <FormInput
            id="descField"
            label="Description"
            value={item.description}
            multiline
            onChange={(value) => dispatch(updateDescription(value))}
          />
          <FormInput
            label="Found"
            type="checkbox"
            additionalProps={{ checked: item.found }}
            onChange={(_, event) =>
              dispatch(toggleFound((event.target as HTMLInputElement).checked))
            }
          />
          <FormInput label="Number of times scanned" value={item.scanned.toString()} readOnly />
          <FormInput label="Last scanned" readOnly value={item.lastScanned} />
          <FormAction type="submit" additionalProps={{ disabled: saving || !item?.name }}>
            {saving ? 'Saving...' : 'Update'}
          </FormAction>
          <FormAction type="button" onClick={handleCancelClick}>
            Cancel
          </FormAction>
        </Form>
      )}
    </section>
  );
}
