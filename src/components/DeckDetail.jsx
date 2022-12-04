import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import {
  collection,
  query,
  onSnapshot,
  doc,
  getDoc,
  where,
  deleteDoc,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';

function DeckDetail() {
  const [deckData, setDeckData] = useState([]);
  const [cardData, setCardData] = useState([]);

  const { deckId } = useParams();
  const navigate = useNavigate();

  // Get deck id and store in state
  function handleCreateCard() {
    navigate('/create-card', { state: { deckId: deckId } });
  }

  // Delete deck
  const handleDeleteDeck = async () => {
    const deckDocRef = doc(db, 'decks', deckId);
    try {
      await deleteDoc(deckDocRef);
      navigate('/decks');
    } catch (err) {
      alert(err);
    }
  };

  // Delete deck
  const handleDeleteCard = async (e) => {
    const cardId = e.target.dataset.id;
    const cardDocRef = doc(db, 'cards', cardId);
    try {
      await deleteDoc(cardDocRef);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Get deck
  useEffect(() => {
    const getDeck = async () => {
      try {
        const docRef = doc(db, 'decks', deckId);
        const docSnap = await getDoc(docRef);
        setDeckData(docSnap.data());
      } catch (err) {
        console.log(err);
      }
    };
    getDeck();
  }, []);

  // Get cards
  useEffect(() => {
    const getCards = async () => {
      const queryCards = query(
        collection(db, 'cards'),
        orderBy('created', 'desc'),
        where('deckId', '==', deckId)
      );
      const viewCards = onSnapshot(queryCards, (querySnapshot) => {
        let cardArr = [];
        querySnapshot.forEach((doc) => {
          cardArr.push({
            id: doc.id,
            front: doc.data().front,
            back: doc.data().back,
            deckId: doc.data().deckId,
          });
          setCardData(cardArr);
        });
      });
    };
    getCards();
  }, []);
  console.log(cardData);

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
              <p className="subtitle is-5">{card.back}</p>
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
        <div className="column is-two-thirds">
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
