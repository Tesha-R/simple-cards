import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './StudyCards.css';

function StudyCards() {
  const [isCardBack, setIsCardBack] = useState(false); // Toggle front and back of card
  const [cardIndex, setCardIndex] = useState(0); // Keep track of card index
  const [cardsData, setCardsData] = useState(''); // Hold cards data
  const { deckId } = useParams();

  //console.log('cardsData', cardsData[cardIndex].front);

  console.log('isCardBack', isCardBack);

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
    return cardsData[index]?.front.length < 10 ? 'txt-lg' : '';
  }

  function renderCard() {
    return (
      <div className="study-study-card-inner">
        {isCardBack && (
          <div className="study-card-back">
            <p className="study-card-content subtitle is-4">
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
      <div className="study-card-el">{renderCard()}</div>
      <button onClick={handleFlip} className="button">
        Flip
      </button>
      <button onClick={handlePrev} className="button">
        Previous
      </button>
      <button onClick={handleNext} className="button">
        Next
      </button>
    </>
  );
}

export default StudyCards;
