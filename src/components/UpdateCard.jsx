import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function UpdateCard() {
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');
  const [deckId, setDeckId] = useState('');

  const { cardId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getCard = async () => {
      try {
        const docRef = doc(db, 'cards', cardId);
        const docSnap = await getDoc(docRef);
        setCardFront(docSnap.data().front);
        setCardBack(docSnap.data().back);
        setDeckId(docSnap.data().deckId);
      } catch (err) {
        console.log(err);
      }
    };
    getCard();
  }, []);

  const updateCard = async (e) => {
    e.preventDefault();
    const cardDocRef = doc(db, 'cards', cardId);
    try {
      await updateDoc(cardDocRef, {
        front: cardFront,
        back: cardBack,
        deckId: deckId,
      });
      navigate(`/decks/${deckId}`);
    } catch (err) {
      alert(err);
    }
  };

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
                <button className="button" onClick={() => navigate(-1)}>
                  Cancel
                </button>
                <button type="submit" className="button is-link">
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
