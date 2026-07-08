import './App.css'
import {useState} from "react";

function App() {
  const [input, setInput] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [currentWord, setCurrentWord] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);

    setInput('');
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  return (
    <>
      <div className="container">
        <div className="playing">
          <div className="currentWord">
            {currentWord.length === 0 ? (
                <>
                  <p>Escribí una palabra para comenzar</p>
                </>
              ) : (
                  currentWord
              )}
          </div>
          <div className="inputForm">
            <form onSubmit={handleSubmit}>
              <input id="textInput" type="text" value={input} onChange={handleChange} />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
