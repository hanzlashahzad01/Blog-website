import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import PostForm from '../features/posts/PostForm';

describe('PostForm', () => {
  it('submits controlled values and calls handler', () => {
    const handleSubmit = vi.fn();
    render(<PostForm onSubmit={handleSubmit} submitLabel="Save Post" />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'My Post' } });
    fireEvent.change(screen.getByLabelText(/Content/i), { target: { value: 'Hello world' } });
    fireEvent.change(screen.getByLabelText(/Author/i), { target: { value: 'Tester' } });
    fireEvent.change(screen.getByLabelText(/Tags/i), { target: { value: 'react, redux' } });
    fireEvent.change(screen.getByLabelText(/Quick note/i), { target: { value: 'Note text' } });

    fireEvent.click(screen.getByText(/Save Post/i));

    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'My Post',
        content: expect.stringContaining('Hello world'),
        author: 'Tester',
        tags: ['react', 'redux'],
      })
    );
  });
});

