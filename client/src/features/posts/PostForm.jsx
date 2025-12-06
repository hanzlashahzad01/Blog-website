import { useEffect, useRef, useState } from 'react';

const initialForm = {
  title: '',
  content: '',
  author: '',
  tags: '',
  imageUrl: '',
};

const PostForm = ({ initialData = null, onSubmit, submitLabel = 'Save Post' }) => {
  const [form, setForm] = useState(initialForm);
  const noteRef = useRef(null); // uncontrolled example

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        content: initialData.content || '',
        author: initialData.author || '',
        tags: initialData.tags?.join(', ') || '',
        imageUrl: initialData.imageUrl || '',
      });
      if (noteRef.current) {
        noteRef.current.value = ''; // reset uncontrolled field when data changes
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const note = noteRef.current?.value?.trim();
    const payload = {
      title: form.title,
      content: note ? `${form.content}\n\nNote: ${note}` : form.content,
      author: form.author || 'Anonymous',
      tags: tagsArray,
      imageUrl: form.imageUrl,
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title mb-3">Post Details</h3>
        <div className="mb-3">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            rows="5"
            value={form.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="author">
              Author
            </label>
            <input
              id="author"
              name="author"
              className="form-control"
              value={form.author}
              onChange={handleChange}
              placeholder="Anonymous"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="tags">
              Tags (comma separated)
            </label>
            <input
              id="tags"
              name="tags"
              className="form-control"
              value={form.tags}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="imageUrl">
            Cover Image URL (optional)
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            className="form-control"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/cover.jpg"
          />
          <small className="text-muted">Paste any hosted image link.</small>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="note">
            Quick note (uncontrolled - useRef demo)
          </label>
          <input
            id="note"
            name="note"
            className="form-control"
            ref={noteRef}
            placeholder="Optional note"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default PostForm;

