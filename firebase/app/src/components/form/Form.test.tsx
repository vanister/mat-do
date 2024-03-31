import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Form from './Form';

describe('Form Tests', () => {
  test('should render a basic form', () => {
    render(
      <Form additionalProps={{ 'aria-label': 'test-form' }}>
        <Form.Input label="Name" value="Jyn" />
        <Form.Action type="button">Ok</Form.Action>
      </Form>
    );

    expect(screen.getByRole('form', { name: 'test-form' })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('Jyn');
    expect(screen.getByRole('button')).toHaveTextContent('Ok');
  });

  test('should handle submit actions', () => {});

  test.todo('should handle normal actions');

  test.todo('should render a single line input');

  test.todo('should render a multiline input');
});
