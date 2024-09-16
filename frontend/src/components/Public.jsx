import { Link } from "react-router-dom";

const Public = () => {
  return (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">RaanTech!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>Your Go-To for Photocopy, Editing, and Tech Repairs</p>
        <address className="public__addr">RaanTech</address>
        <p>Owner: Afraan Mohamed</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
};
export default Public;
