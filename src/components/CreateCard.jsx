import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function CreateCard() {
  const { deckId } = useParams();
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');

  function postData() {
    axios.post('http://localhost:3000/cards', {
      deckId: deckId,
      front: '',
      back: '',
    });
  }

  return (
    <>
      <div className="container is-widescreen mt-6">
        <div className="columns">
          <div className="column is-half">
            <form>
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
              <button type="submit" className="button">
                Create a Card
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCard;
