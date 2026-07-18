function About() {
  return (
    <div className="card">
      <h2>About This Bookstore</h2>
      <p>
        This MERN bookstore demo uses React for the frontend, Express and
        MongoDB for the backend, and Axios to connect the two. You can add,
        edit, and delete books with a clean interface.
      </p>
      <p>
        To run the project locally, start the backend on port 5000 and the
        frontend on port 3000. The frontend automatically proxies API calls to
        the backend.
      </p>
    </div>
  );
}

export default About;
