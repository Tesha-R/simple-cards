import { Routes, Route, Router } from 'react-router-dom';

import Header from './components/Header';
import Decks from './components/Decks';
import Home from './components/Home';
import CreateDeck from './components/CreateDeck';
import DeckDetail from './components/DeckDetail';
import CreateCard from './components/CreateCard';
import StudyCards from './components/StudyCards';
import UpdateDeck from './components/UpdateDeck';
import UpdateCard from './components/UpdateCard';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/decks" element={<Decks />} />
        <Route path="/create-deck" element={<CreateDeck />} />
        <Route path="/decks/:deckId" element={<DeckDetail />} />
        <Route path="/create-card" element={<CreateCard />} />
        <Route path="/decks/:deckId/cards" element={<StudyCards />} />
        <Route path="/decks/:deckId/edit-deck" element={<UpdateDeck />} />
        <Route path="/cards/:cardId/edit-card" element={<UpdateCard />} />
      </Routes>
    </>
  );
}

export default App;
