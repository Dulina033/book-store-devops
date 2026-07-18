import { useEffect, useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import BookDetails from "./pages/BookDetails";
import About from "./pages/About";

const initialForm = {
  title: "",
  author: "",
  genre: "",
  price: "",
  description: "",
};

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/books");
      setBooks(res.data);
      setMessage("");
    } catch (error) {
      setMessage(
        "Unable to load books. Make sure the backend server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const createBook = async (book) => {
    await axios.post("/api/books", { ...book, price: Number(book.price) });
  };

  const updateBook = async (book) => {
    await axios.put(`/api/books/${book._id}`, {
      ...book,
      price: Number(book.price),
    });
  };

  const handleSaveBook = async (book) => {
    try {
      if (book._id) {
        await updateBook(book);
        setMessage("Book updated successfully.");
      } else {
        await createBook(book);
        setMessage("Book added successfully.");
      }
      setSelectedBook(null);
      fetchBooks();
      navigate("/books");
    } catch (error) {
      setMessage("Unable to save book. Please check the form and try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      setMessage("Book deleted.");
      fetchBooks();
    } catch (error) {
      setMessage("Unable to delete book.");
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    navigate("/add");
  };

  const handleView = (id) => {
    navigate(`/books/${id}`);
  };

  const clearSelection = () => {
    setSelectedBook(null);
    navigate("/books");
  };

  return (
    <div className="container">
      <nav className="nav-bar">
        <h1>Bookstore</h1>
        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Books
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Add Book
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </div>
      </nav>

      {message && <div className="flash-message">{message}</div>}

      <Routes>
        <Route
          path="/"
          element={<Home bookCount={books.length} loading={loading} />}
        />
        <Route
          path="/books"
          element={
            <BookList
              books={books}
              loading={loading}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onView={handleView}
            />
          }
        />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route
          path="/add"
          element={
            <AddBook
              book={selectedBook}
              onSave={handleSaveBook}
              onCancel={clearSelection}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="*"
          element={<Home bookCount={books.length} loading={loading} />}
        />
      </Routes>
    </div>
  );
}

export default App;
