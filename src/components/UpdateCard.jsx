import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateCard() {
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');
  const [deckId, setDeckId] = useState('');

  const { cardId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/cards/${cardId}`).then((response) => {
      setCardFront(response.data.front);
      setCardBack(response.data.back);
      setDeckId(response.data.deckId);
    });
  }, []);

  function updateCard(e) {
    e.preventDefault();
    axios.put(`http://localhost:3000/cards/${cardId}`, {
      front: cardFront,
      back: cardBack,
      deckId: deckId,
    });
    navigate(`/decks/${deckId}`);
  }

  return (
    <>
      <div className="container is-widescreen mt-6">
        <div className="columns">
          <div className="column is-half">
            <h2 className="title">Update card</h2>
            <form onSubmit={updateCard}>
              <div className="field">
                <label>Card front</label>
                <div className="control">
                  <input
                    value={cardFront}
                    className="input"
                    type="text"
                    placeholder="Card front"
                    onChange={(e) => {
                      setCardFront(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="field">
                <label>Card back</label>
                <div className="control">
                  <textarea
                    value={cardBack}
                    className="textarea"
                    placeholder="Deck description"
                    onChange={(e) => {
                      setCardBack(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="buttons">
                <button
                  type="button"
                  className="button"
                  onClick={() => navigate(-1)}
                >
                  go back
                </button>
                <button type="submit" className="button is-primary">
                  Update Card
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateCard;
