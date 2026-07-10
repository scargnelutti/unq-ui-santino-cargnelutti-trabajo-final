import './App.css'
import {useRef, useState} from "react";
import {validate} from "./service/word-api-service.jsx";

function App() {
  const [input, setInput] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const timerRef = useRef(null);
  const [isWrongWord, setIsWrongWord] = useState(false);
  const [points, setPoints] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // timerRef.current = setTimeout(() => {
    //   console.log("Esperando")
    // }, 2000)
    validate(input).then((response) => {
      const { exists } = response.data
      if (exists) {
        console.log("Bien");
        setInput(input.at(-1));
        setIsWrongWord(false);
        setPoints(points + 1);
      } else {
        setIsWrongWord(true);
        console.log("Mal");
      }
      // quizá debería evitar enviar nada a la API
    }).catch((err) => {
      console.log(err.response);
    }).finally(() => {
    })
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  return (
    <>
      <div className="container">
        <div className="playing">
          <div className="info">
            {currentWord === '' ? (
                <>
                  <p>Escribí una palabra para comenzar</p>
                </>
              ) : (
                  currentWord
              )}
            <p>{points}</p>
          </div>
          <div className="inputForm">
            <form onSubmit={handleSubmit}>
              <input id="textInput" type="text" value={input} onChange={handleChange} />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="feedback">
            {isWrongWord && (<p>No es una palabra válida</p>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
