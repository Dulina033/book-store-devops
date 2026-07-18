function BookList({ books, loading, onDelete, onEdit, onView }) {
  if (loading) {
    return <div className="loading-state">Loading books...</div>;
  }

  if (!books.length) {
    return (
      <div className="card">
        <h2>Book List</h2>
        <p>
          No books have been added yet. Use the Add Book page to create your
          first entry.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h2>Book List</h2>
      </div>
      <div className="book-list">
        {books.map((book) => (
          <div key={book._id} className="card book-card">
            <h3>{book.title}</h3>
            <div className="book-meta">
              <span>By {book.author}</span>
              <span>{book.genre}</span>
              <span>${book.price}</span>
            </div>
            <p>{book.description}</p>
            <div className="card-actions">
              <button
                className="secondary-button"
                onClick={() => onView(book._id)}
              >
                View
              </button>
              <button className="secondary-button" onClick={() => onEdit(book)}>
                Edit
              </button>
              <button
                className="primary-button"
                onClick={() => onDelete(book._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
