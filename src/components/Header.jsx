import { Link } from 'react-router-dom';

function Header() {
  return (
    <section className="nav-el">
      <div className="container is-widescreen">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <h1 className="logo-el is-size-4">
              <Link to="/">SimpleCards</Link>
            </h1>
            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link to="/decks" className="button">
                    My Decks
                  </Link>
                  <Link to="/create-deck" className="button is-primary">
                    Create a deck
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}

export default Header;
