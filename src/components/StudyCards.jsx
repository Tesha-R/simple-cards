import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './StudyCards.css';

function StudyCards() {
  const [isCardBack, setIsCardBack] = useState(false); // Toggle front and back of card
  const [cardIndex, setCardIndex] = useState(0); // Keep track of card index
  const [cardsData, setCardsData] = useState(''); // Hold cards data

  const { deckId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/decks/${deckId}/cards`)
      .then((response) => setCardsData(response.data));
  }, []);

  function handleNext() {
    if (cardIndex < cardsData.length - 1 && cardIndex !== cardsData.length) {
      setCardIndex(cardIndex + 1);
    }
  }
  function handlePrev() {
    if (cardIndex < cardsData.length && cardIndex !== 0) {
      setCardIndex(cardIndex - 1);
    }
    console.log('cardIndex', cardIndex);
  }
  function handleFlip() {
    setIsCardBack((prevState) => !prevState);
  }

  function largerTextCard(index) {
    return cardsData[index]?.front.length < 15 ? 'txt-lg' : '';
  }

  function renderCard() {
    return (
      <div className="study-study-card-inner">
        {isCardBack && (
          <div className="study-card-back">
            <p className="study-card-content subtitle is-3">
              {cardsData[cardIndex]?.back}
            </p>
          </div>
        )}
        <div className="study-card-front">
          <p
            className={
              'study-card-content title is-3 ' + largerTextCard(cardIndex)
            }
          >
            {cardsData[cardIndex]?.front}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container is-widescreen mt-6">
        <div className="block mb- 6">
          <div className="button" onClick={() => navigate(-1)}>
            Go Back to deck
          </div>
        </div>
        <div className="study-card-el box ">{renderCard()}</div>
        <div className="buttons study-btns">
          <button onClick={handlePrev} className="button is-link is-light">
            Previous
          </button>
          <button onClick={handleFlip} className="button is-link">
            Flip
          </button>
          <button onClick={handleNext} className="button is-link is-light">
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default StudyCards;
