import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/api/books/${id}`);
        setBook(res.data);
      } catch (error) {
        setMessage("Book not found.");
      }
    };

    fetchBook();
  }, [id]);

  if (message) {
    return (
      <div className="card">
        <h2>Book Details</h2>
        <p>{message}</p>
        <button className="secondary-button" onClick={() => navigate("/books")}>
          Back to list
        </button>
      </div>
    );
  }

  if (!book) {
    return <div className="loading-state">Loading book details...</div>;
  }

  return (
    <div className="card">
      <h2>{book.title}</h2>
      <div className="book-meta">
        <span>By {book.author}</span>
        <span>{book.genre}</span>
        <span>${book.price}</span>
      </div>
      <p>{book.description}</p>
      <button className="secondary-button" onClick={() => navigate("/books")}>
        Back to list
      </button>
    </div>
  );
}

export default BookDetails;
