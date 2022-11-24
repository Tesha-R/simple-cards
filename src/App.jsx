import { Routes, Route, Router } from 'react-router-dom';
import Header from './components/Header';
import Decks from './components/Decks';
import Home from './components/Home';
import CreateDeck from './components/CreateDeck';
import Deck from './components/Deck';
import './App.css';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/decks" element={<Decks />} />
        <Route path="/create-deck" element={<CreateDeck />} />
        <Route path="/deck" element={<Deck />} />
      </Routes>
    </>
  );
}

export default App;
