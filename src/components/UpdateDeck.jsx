import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateDeck() {
  const [deckTitle, setDeckTitle] = useState('');
  const [deckDescription, setDeckDescription] = useState('');

  const { deckId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/decks/${deckId}`).then((response) => {
      setDeckTitle(response.data.title);
      setDeckDescription(response.data.description);
    });
  }, []);

  function updateDeck(e) {
    e.preventDefault();
    axios.put(`http://localhost:3000/decks/${deckId}`, {
      title: deckTitle,
      description: deckDescription,
    });
    navigate(`/decks/${deckId}`);
  }

  return (
    <div className="container is-widescreen mt-6">
      <div className="columns">
        <div className="column is-half">
          <h2 className="title">Edit: {deckTitle}</h2>
          <form onSubmit={updateDeck}>
            <div className="field">
              <label>Deck title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Deck title"
                  value={deckTitle}
                  onChange={(e) => {
                    setDeckTitle(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="field">
              <label>Deck description</label>
              <div className="control">
                <textarea
                  value={deckDescription}
                  className="textarea"
                  placeholder="Deck description"
                  onChange={(e) => {
                    setDeckDescription(e.target.value);
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
              <button type="submit" className="button is-primary">
                Update deck
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateDeck;
