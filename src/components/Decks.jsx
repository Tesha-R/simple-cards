import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Decks() {
  const [apiData, setApiData] = useState([]);
  // show data when application loads
  useEffect(() => {
    axios
      .get('http://localhost:3000/decks')
      .then((response) => setApiData(response.data));
  }, [apiData]);
  const decks = apiData.map((deck) => {
    return (
      <div className="column is-4">
        <div className="card" key={deck.id}>
          <div className="card-content">
            <h2 className="title">
              <Link to={`/decks/${deck.id}`}>{deck.title}</Link>
            </h2>
            <p>{deck.description}</p>
          </div>
          <p className="card-footer-item has-text-left"># Cards</p>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="container is-widescreen mt-6">
        <div className="columns is-multiline">{decks}</div>
      </div>
      ;
    </>
  );
}

export default Decks;
