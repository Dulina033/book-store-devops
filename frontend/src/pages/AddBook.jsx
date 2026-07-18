import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  author: "",
  genre: "",
  price: "",
  description: "",
};

function AddBook({ book, onSave, onCancel }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "",
        price: book.price?.toString() || "",
        description: book.description || "",
        _id: book._id,
      });
    } else {
      setForm(initialForm);
    }
  }, [book]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.genre || !form.price) {
      return;
    }
    await onSave(form);
    setForm(initialForm);
  };

  return (
    <div className="card">
      <h2>{form._id ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <input
          placeholder="Title"
          value={form.title}
          onChange={handleChange("title")}
        />
        <input
          placeholder="Author"
          value={form.author}
          onChange={handleChange("author")}
        />
        <input
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange("genre")}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange("price")}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={handleChange("description")}
        />
        <div className="card-actions">
          <button type="submit" className="primary-button">
            Save Book
          </button>
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
