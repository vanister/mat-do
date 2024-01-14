import './Scan.scss';

import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import Form from '../../components/form/Form';
import FormInput from '../../components/form/FormInput';
import FormAction from '../../components/form/FormAction';
import { INITIAL_STATE, scanReducer } from './reducer';
import { getUserLocation, initScan, updateComments, updateScan } from './actions';
import { useThunkReducer } from '../../hooks/useThunkReducer';

export default function Scan() {
  const { id: itemId } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [state, dispatch] = useThunkReducer(scanReducer, INITIAL_STATE);
  const { scannedItem: item, comments, saving } = state;

  useEffect(() => {
    dispatch(initScan(itemId, location.hash));
  }, [dispatch, itemId, location.hash]);

  const handleUseCurrentLocation = async (toggled: boolean) => {
    await dispatch(getUserLocation(toggled));
  };

  const handleCommentFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      await dispatch(updateScan({ comments, coordinates: state.itemCoordinates }));

      navigate('/thankyou', { replace: true });
    },
    [comments, dispatch, navigate, state.itemCoordinates]
  );

  return (
    <section className="scan-page">
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
          onChange={(_, event) =>
            handleUseCurrentLocation((event.target as HTMLInputElement).checked)
          }
          additionalProps={{ checked: state.useCurrentLocation }}
        />
        <FormInput
          label="Recorded location"
          readOnly
          value={state.requestingUserLocation ? 'Determining location...' : state.coordinateString}
        />
        <FormInput
          label="Comments"
          value={comments}
          required
          multiline
          placeholder="Brief description of where you found it..."
          onChange={(value) => {
            dispatch(updateComments(value));
          }}
          additionalProps={{ rows: 4, maxLength: 200 }}
        />
        <FormAction type="submit" disabled={!comments || saving}>
          Share
        </FormAction>
      </Form>
    </section>
  );
}
