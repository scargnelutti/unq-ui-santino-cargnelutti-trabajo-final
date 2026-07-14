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
  const [usedWords, setUsedWords] = useState([]);
  const [isWordRepeated, setIsWordRepeated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usedWords.includes(input)) {
      console.log("INCLUYE?", input);
      setIsWordRepeated(true);
      return;
    }

    // timerRef.current = setTimeout(() => {
    //   console.log("Esperando")
    // }, 2000)
    validate(input).then((response) => {
      const { exists } = response.data
      if (exists) {
        console.log("Bien");
        setUsedWords((prevState) => [...prevState, input]);
        setCurrentWord(input);
        setInput(input.at(-1));
        setIsWrongWord(false);
        setPoints(points + 1);
        setIsWordRepeated(false);
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

  // const handleChange = (e) => {
  //   if (currentWord === '') {
  //     setInput(e.target.value);
  //     return;
  //   }
  //
  //   if (input.startsWith(currentWord.at(-1))) {
  //     setInput(e.target.value);
  //   } else {
  //     setInput(currentWord.at(-1))
  //   }
  // }

  const handleChange = (e) => {
    const currentInput = e.target.value;
    const lastLetter = currentWord.at(-1);

    if (!currentWord || currentInput.startsWith(lastLetter)) {
      setInput(currentInput);
    } else {
      setInput(lastLetter);
    }
  };

  // const [timer, { startCountdown}] = useCountdown({countStart, intervalMs: 1000});
  return (
    <div className="container">
      <div className="playing">
        <div className="info">
          {currentWord === '' ? (
              <p>Escribí una palabra para comenzar</p>
            ) : (
                <p>{currentWord}</p>
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
          {isWordRepeated && (<p>La palabra ya fue usada</p>)}
        </div>
      </div>
    </div>
  )
}

export default App
