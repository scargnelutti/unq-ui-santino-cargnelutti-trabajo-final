import {useEffect, useState} from 'react'
import './App.css'
import Card from "./components/Card.jsx";




function App() {

  const [deck, setDeck] = useState([]);

  useEffect(() => {
    setDeck(generateShuffledDeck())
  }, [])

  const generateShuffledDeck = () => {
    const deck = [
      'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
      'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
    ];

    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
  };

  return (
    <main>
      <h1>Memotest</h1>
      <div className="grid">
        {deck.map((content) => (
            <Card
                content={content}
            />
        ))}
      </div>
    </main>
  )
}

export default App
