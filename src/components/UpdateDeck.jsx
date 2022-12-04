import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function UpdateDeck() {
  const [deckTitle, setDeckTitle] = useState('');
  const [deckDescription, setDeckDescription] = useState('');

  const { deckId } = useParams();
  const navigate = useNavigate();

  // Get deck title
  useEffect(() => {
    const getDeck = async () => {
      try {
        const docRef = doc(db, 'decks', deckId);
        const docSnap = await getDoc(docRef);
        setDeckTitle(docSnap.data().title);
        setDeckDescription(docSnap.data().description);
      } catch (err) {
        console.log(err);
      }
    };
    getDeck();
  }, []);

  const updateDeck = async (e) => {
    e.preventDefault();
    const deckDocRef = doc(db, 'decks', deckId);
    try {
      await updateDoc(deckDocRef, {
        title: deckTitle,
        description: deckDescription,
      });
      navigate(`/decks/${deckId}`);
    } catch (err) {
      alert(err);
    }
  };

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
              <div className="button" onClick={() => navigate(-1)}>
                Cancel
              </div>
              <button type="submit" className="button is-link">
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
