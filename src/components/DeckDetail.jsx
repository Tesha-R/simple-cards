import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DeckDetail() {
  const { serviceId } = useParams();
  const [apiData, setApiData] = useState('');

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/decks/${serviceId}`)
  //     .then((response) => setApiData(apiData));
  // }, []);

  // const deckDetail = apiData.map((deck)=>{

  // })
  return (
    <div className="container is-widescreen mt-6">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div>
              <h2 className="title is-3 mb-3">Deck title</h2>
              <p>deck decription</p>
            </div>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <div className="buttons">
              <button className="button is-link is-outlined">Study</button>
              <button className="button is-link is-outlined">Edit</button>
              <button className="button is-link is-outlined">Delete</button>
              <button className="button is-primary">Add card</button>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-half">
          <div className="card">
            <div className="card-content">
              <div className="block">
                <h6 className="subtitle is-6">Front</h6>
                <p className="title is-3 mt-2">
                  Differentiate between Real DOM and Virtual DOM
                </p>
              </div>
              <div className="block">
                <h6 className="subtitle is-6">Back</h6>
                <p className="subtitle is-4">
                  Virtual DOM updates are faster but do not directly update the
                  HTML
                </p>
              </div>
            </div>
            <footer className="card-footer">
              <a href="#" className="card-footer-item">
                Edit
              </a>
              <a href="#" className="card-footer-item">
                Delete
              </a>
            </footer>
          </div>
        </div>
        <div className="column is-half"></div>
      </div>
    </div>
  );
}

export default DeckDetail;
