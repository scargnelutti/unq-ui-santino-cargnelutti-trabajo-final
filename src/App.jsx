import {useEffect, useState} from 'react'
import './App.css'
import Card from "./components/Card.jsx";

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setCards(generateShuffledDeck());
    setFlippedCards([]);
    setMatchedPairs(0);
    setGameOver(false);
  }, [gameOver])

  const generateShuffledDeck = () => {
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']
    return [...emojis, ...emojis]
        .sort(() => Math.random() - 0.5)
        .map((emoji, index) => ({id: index, emoji, flipped: false, matched: false}));
  };

  const handleClick = (clickedCard) => {
    if (flippedCards.length === 2 || clickedCard.flipped || clickedCard.matched) {
      return;
    }

    const newCards = cards.map(card =>
        card.id === clickedCard.id ? { ...card, flipped: true } : card
    )

    const newFlippedCards = [...flippedCards, clickedCard]
    setCards(newCards)
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setTimeout(() => checkMatch(newFlippedCards), 1000)
    }
  }

  const checkMatch = (flippedPair) => {
    const [card1, card2] = flippedPair
    if (card1.emoji === card2.emoji) {
      const newCards = cards.map(card =>
          card.id === card1.id || card.id === card2.id ? { ...card, matched: true } : card
      )
      setCards(newCards)
      setMatchedPairs(prev => prev + 1)
      if (matchedPairs + 1 === 8) {
        setGameOver(true)
      }
    } else {
      const newCards = cards.map(card =>
          card.id === card1.id || card.id === card2.id ? { ...card, flipped: false } : card
      )
      setTimeout(() => setCards(newCards), 500)
    }
    setFlippedCards([])
  }

  return (
      <main>
        <h1>Memotest</h1>
        <div className="grid">
          {cards.map((card, index) => (
              <Card
                  key={index}
                  card={card}
                  onClick={() => handleClick(card)}
              />
          ))}
        </div>
        <button onClick={() => setGameOver(true)}>Reiniciar juego</button>
      </main>
  )
}

export default App
