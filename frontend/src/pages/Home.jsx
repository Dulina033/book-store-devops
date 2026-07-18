function Home({ bookCount, loading }) {
  return (
    <div className="card">
      <h2>Welcome to the Bookstore</h2>
      <p>
        Manage your book catalog with a simple interface. Add new books, edit existing items, and delete
        books when they are no longer needed.
      </p>
      <div className="book-meta">
        <span>{loading ? 'Loading books...' : `${bookCount} books available`}</span>
      </div>
    </div>
  );
}

export default Home;
