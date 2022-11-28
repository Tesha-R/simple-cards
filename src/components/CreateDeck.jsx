import axios from 'axios';
import { useState } from 'react';

function CreateDeck() {
  // const [deckForm, setDeckForm] = useState({
  //   title: '',
  //   description: '',
  // });
  const [deckTitle, setDeckTitle] = useState('');
  const [deckDescription, setDeckDescription] = useState('');

  // console.log('title', deckTitle);
  // console.log('description', deckDescription);

  function postDeckData() {
    axios.post('http://localhost:3000/decks', {
      title: deckTitle,
      description: deckDescription,
    });
  }

  return (
    <>
      <div className="container is-widescreen mt-6">
        <div className="columns">
          <div className="column is-half">
            <h2 className="title">Create a new deck</h2>
            <form>
              <div className="field">
                <label>Deck title</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Deck title"
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
                    className="textarea"
                    placeholder="Deck description"
                    onChange={(e) => {
                      setDeckDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                onClick={postDeckData}
                className="button is-primary"
              >
                Create deck
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateDeck;
