import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

function Decks() {
  const [apiData, setApiData] = useState([]);

  // show data when application loads
  useEffect(() => {
    const queryDecks = query(
      collection(db, 'decks'),
      orderBy('created', 'desc')
    );
    onSnapshot(queryDecks, (querySnapshot) => {
      setApiData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const decks = apiData.map((deck) => {
    return (
      <div className="column is-4">
        <div className="card deck-el">
          <div className="card-content" key={deck.id}>
            <h2 className="title">
              <Link to={`/decks/${deck.id}`}>{deck.data.title}</Link>
            </h2>
            <p>{deck.data.description}</p>
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
