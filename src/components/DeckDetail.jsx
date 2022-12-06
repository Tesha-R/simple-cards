import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function DeckDetail() {
  const [deckData, setDeckData] = useState([]);
  const [cardData, setCardData] = useState([]);

  const { deckId } = useParams();
  const navigate = useNavigate();

  // get deck id and store in state
  function handleCreateCard() {
    navigate('/create-card', { state: { deckId: deckId } });
  }

  // delete deck and cards and redirect to decks page
  function handleDeleteDeck() {
    axios.delete(`http://localhost:3000/decks/${deckId}`);
    axios.delete(`http://localhost:3000/cards/${deckId}`);
    navigate('/decks');
  }
  // delete card and reload page
  async function handleDeleteCard(e) {
    const cardId = e.target.dataset.id;
    await axios.delete(`http://localhost:3000/cards/${cardId}`);
    window.location.reload();
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
            <Link
              to={`/cards/${card.id}/edit-card`}
              className="card-footer-item"
            >
              Edit
            </Link>
            <button
              onClick={handleDeleteCard}
              data-id={card.id}
              className=" button is-ghost card-footer-item"
            >
              Delete
            </button>
          </footer>
        </div>
      </div>
    );
  });
  return (
    <div className="container is-widescreen mt-6">
      <div className="columns is-vcentered">
        <div className="column is-8">
          <div>
            <h2 className="title is-3 mb-3">{deckData.title}</h2>
            <p>{deckData.description}</p>
          </div>
        </div>
        <div className="column">
          <div className="buttons">
            <Link
              to={`/decks/${deckId}/cards`}
              className="button is-link is-outlined"
            >
              Study
            </Link>
            <Link
              to={`/decks/${deckId}/edit-deck`}
              className="button is-link is-outlined"
            >
              Edit
            </Link>
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
      <div className="columns is-multiline">{cards}</div>
    </div>
  );
}

export default DeckDetail;
