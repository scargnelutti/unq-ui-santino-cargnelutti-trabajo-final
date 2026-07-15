import './App.css'
import {useEffect, useRef, useState} from "react";
import {validate} from "./service/word-api-service.jsx";

const cleanInput = (text) => {
  return text.toLowerCase().normalize("NFD").replace(/(?!\u0303)[\u0300-\u036f]/g, "");
}

function App() {
  const [input, setInput] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [isWrongWord, setIsWrongWord] = useState(false);
  const [points, setPoints] = useState(0);
  const [usedWords, setUsedWords] = useState([]);
  const [isWordRepeated, setIsWordRepeated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isTimerActive || gameOver) return;

    setTimeLeft(15);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          setGameOver(true);
          setIsTimerActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isTimerActive, gameOver, resetTrigger]);

  const resetTimer = () => {
    setResetTrigger((prev) => prev + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (gameOver || !input.trim() || isLoading) {
      return;
    }
    if (usedWords.includes(input)) {
      setIsWordRepeated(true);
      return;
    }

    setIsLoading(true);
    validate(input).then((response) => {
      const { exists } = response.data
      if (exists) {
        setUsedWords((prevState) => [...prevState, input]);
        setCurrentWord(input);
        setInput(input.at(-1));
        setIsWrongWord(false);
        setPoints((prevState) => prevState + input.length);
        setIsWordRepeated(false);

        if (!isTimerActive) {
          setIsTimerActive(true);
        }
        resetTimer();
      } else {
        setIsWrongWord(true);
      }
    }).catch((err) => {
      console.log(err.response);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  const handleChange = (e) => {
    const currentInput = cleanInput(e.target.value);
    const lastLetter = currentWord.at(-1);

    if (!currentWord || currentInput.startsWith(lastLetter)) {
      setInput(currentInput);
    } else {
      setInput(lastLetter);
    }
  };

  const handleRestart = () => {
    setInput('');
    setGameOver(false);
    setCurrentWord('');
    setIsWrongWord(false);
    setPoints(0);
    setUsedWords([]);
    setIsWordRepeated(false);
    setTimeLeft(15);
    setIsTimerActive(false);
    setResetTrigger(0);
    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="info">
        <div className="points">
          <p>Puntos: {points}</p>
        </div>
        <div className="status">
          <p>{currentWord}</p>
        </div>
        <div className="timer">
          <p>
            Tiempo: {timeLeft}s
          </p>
        </div>
      </div>

      {gameOver ? (
          <div className="gameOver">
            <p>Fin</p>
            <div className="gameSummary">
              <p>Puntaje final: {points}</p>
              <p>Palabras logradas: {usedWords.length}</p>
            </div>
            <button className="restartButton" onClick={handleRestart}>Reiniciar</button>
          </div>
      ) : (
          <div className="inputForm">
            <form onSubmit={handleSubmit}>
              <input
                  id="textInput"
                  type="text"
                  value={input}
                  onChange={handleChange}
                  autoComplete="off"
              />
              <button className="enviarPalabra" type="submit" disabled={isLoading}>
                Enviar
              </button>
            </form>
          </div>
      )}
      <div className="feedback">
        {currentWord === '' && (<p>Escribí una palabra para comenzar</p>)}
        {isWrongWord && (<p>No es una palabra válida</p>)}
        {isWordRepeated && (<p>La palabra ya fue usada</p>)}
        {usedWords.length > 0 && (
            <div className="historyContainer">
              <p className="historyTitle">PALABRAS USADAS</p>
              <div className="historyList">
                {usedWords.map((word, index) => (
                    <span key={index} className="historyWord">
                {word}
                      {index < usedWords.length - 1 && <span className="arrow">➔</span>}
              </span>
                ))}
              </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default App;
