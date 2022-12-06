import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CreateCard() {
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');

  const { state } = useLocation(); // get deckId in state from detail page
  const navigate = useNavigate();

  function postData(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/cards', {
      deckId: state.deckId,
      front: cardFront,
      back: cardBack,
    });
    navigate(`/decks/${state.deckId}`);
  }
  return (
    <>
      <div className="container is-widescreen mt-6">
        <div className="columns">
          <div className="column is-half">
            <h2 className="title">Create a card</h2>
            <form>
              <div className="field">
                <label>Card front</label>
                <div className="control">
                  <input
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
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={postData}
                  className="button is-link"
                >
                  Create a Card
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCard;
