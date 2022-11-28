import { Routes, Route, Router } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Decks from './components/Decks';
import Home from './components/Home';
import CreateDeck from './components/CreateDeck';
import DeckDetail from './components/DeckDetail';
import CreateCard from './components/CreateCard';

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
      </Routes>
    </>
  );
}

export default App;
