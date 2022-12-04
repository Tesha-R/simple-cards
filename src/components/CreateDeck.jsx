import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

function CreateDeck() {
  const [deckTitle, setDeckTitle] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const navigate = useNavigate();

  const postDeckData = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'decks'), {
        title: deckTitle,
        description: deckDescription,
        created: Timestamp.now(),
      }).then(({ id }) => {
        navigate(`/decks/${id}`);
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div className="container is-widescreen mt-6">
        <div className="columns">
          <div className="column is-half">
            <h2 className="title">Create a new deck</h2>
            <form onSubmit={postDeckData}>
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
              <div className="buttons">
                <button type="submit" className="button is-link">
                  Create deck
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateDeck;
