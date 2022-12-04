import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

function CreateCard() {
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');

  const { state } = useLocation(); // get deckId in state from detail page
  const navigate = useNavigate();

  const postCardData = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'cards'), {
        deckId: state.deckId,
        front: cardFront,
        back: cardBack,
        created: Timestamp.now(),
      });
      navigate(`/decks/${state.deckId}`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div className="container is-widescreen mt-6">
        <div className="columns">
          <div className="column is-half">
            <h2 className="title">Create a card</h2>
            <form onSubmit={postCardData}>
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
                <button type="submit" className="button is-link">
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
