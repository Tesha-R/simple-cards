import axios from 'axios';

import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function DeckDetail() {
  const { deckId } = useParams();
  const [deckData, setDeckData] = useState([]);
  const [cardData, setCardData] = useState([]);

  const navigate = useNavigate();

  // get deck id and store in state
  function handleCreateCard() {
    navigate('/create-card', { state: { deckId: deckId } });
  }

  // delete deck and cards and redirect to decks page
  async function handleDeleteDeck() {
    try {
      await axios.delete(`http://localhost:3000/decks/${deckId}`);
      await axios.delete(`http://localhost:3000/cards/${deckId}`);
      navigate('/decks');
    } catch (error) {
      console.log(error, 'no cards associated with deck id');
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const respDecks = await axios.get(
        `http://localhost:3000/decks/${deckId}`
      );
      const respCards = await axios.get(
        `http://localhost:3000/decks/${deckId}/cards`
      );
      setDeckData(respDecks.data);
      setCardData(respCards.data);
    };
    fetchData();
  }, []);

  const cards = cardData.map((card) => {
    return (
      <div className="column is-half">
        <div className="card card-el">
          <div className="card-content">
            <div className="block">
              <h6 className="subtitle is-6">Front</h6>
              <p className="title is-3 mt-2">{card.front}</p>
            </div>
            <div className="block">
              <h6 className="subtitle is-6">Back</h6>
              <p className="subtitle is-4">{card.back}</p>
            </div>
          </div>
          <footer className="card-footer">
            <a href="#" className="card-footer-item">
              Edit
            </a>
            <a href="#" className="card-footer-item">
              Delete
            </a>
          </footer>
        </div>
      </div>
    );
  });
  return (
    <div className="container is-widescreen mt-6">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div>
              <h2 className="title is-3 mb-3">{deckData.title}</h2>
              <p>{deckData.description}</p>
            </div>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <div className="buttons">
              <Link
                to={`/decks/${deckId}/cards`}
                className="button is-link is-outlined"
              >
                Study
              </Link>
              <button className="button is-link is-outlined">Edit</button>
              <button
                className="button is-link is-outlined"
                onClick={handleDeleteDeck}
              >
                Delete
              </button>
              <button
                className="button is-link is-outlined ml-4"
                onClick={handleCreateCard}
              >
                Add a card
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-multiline">{cards}</div>
    </div>
  );
}

export default DeckDetail;
