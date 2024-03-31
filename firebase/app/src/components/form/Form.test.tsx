import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
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

  test('should handle submit actions', () => {
    const handleSubmit = jest.fn();

    render(
      <Form onSubmit={handleSubmit} additionalProps={{ 'aria-label': 'test-form' }}>
        <Form.Input label="Name" value="Jyn" />
        <Form.Action type="submit">Submit</Form.Action>
      </Form>
    );

    fireEvent.submit(screen.getByRole('form', { name: 'test-form' }));

    expect(handleSubmit).toHaveBeenCalled();
  });

  test('should handle normal actions', () => {
    const handleAction = jest.fn();

    render(
      <Form additionalProps={{ 'aria-label': 'test-form' }}>
        <Form.Input label="Name" value="Jyn" />
        <Form.Action type="button" onClick={handleAction}>
          Ok
        </Form.Action>
      </Form>
    );

    fireEvent.click(screen.getByText('Ok'));

    expect(handleAction).toHaveBeenCalled();
  });

  test('should render a single line input', () => {
    render(
      <Form additionalProps={{ 'aria-label': 'test-form' }}>
        <Form.Input label="Name" value="Jyn" />
      </Form>
    );

    const textInput = screen.getByRole('textbox');

    expect(textInput).toHaveAttribute('type', 'text');
  });

  test('should render a multiline input', () => {
    render(
      <Form additionalProps={{ 'aria-label': 'test-form' }}>
        <Form.Input multiline label="Name" value="Jyn" />
      </Form>
    );

    const textInput = screen.getByRole('textbox');

    expect(textInput).toBeInstanceOf(HTMLTextAreaElement);
  });
});
