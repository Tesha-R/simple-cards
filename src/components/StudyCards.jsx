import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function StudyCards() {
  const [isCardBack, setIsCardBack] = useState(false); // Toggle front and back of card
  const [cardIndex, setCardIndex] = useState(0); // Keep track of card index
  const [cardsData, setCardsData] = useState(''); // Hold cards data
  const { deckId } = useParams();

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
    return cardsData[index].front.length < 10 ? 'txt-lg' : '';
  }

  function renderCard() {
    return (
      <div className="card-inner">
        {isCardBack && (
          <div className="card-back">
            <p className="card-content">{cardsData[cardIndex].back}</p>
          </div>
        )}
        <div className="card-front">
          <p className={'card-content ' + largerTextCard(cardIndex)}>
            {cardsData[cardIndex].front}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card-el">{renderCard()}</div>
      <button onClick={handleFlip}>Flip</button>
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </>
  );
}

export default StudyCards;
