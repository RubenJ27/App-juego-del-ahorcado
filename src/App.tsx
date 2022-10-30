import { letters } from './helpers/Letters'
import './App.css'
import { GetImages } from './components/GetImages'
import { useEffect, useState } from 'react';
import { GetRamdomWords } from './components/GetRamdomWords';

function App() {

  const [words, setWords] = useState(GetRamdomWords());
  const [hiddenWords, setHiddenWords] = useState('_ '.repeat(words.length));
  const [tries, setTries] = useState(0);
  const [winner, setWinner] = useState(false);
  const [lost, setLost] = useState(false);

  /* the person lost */
  useEffect(() => {
    if (tries === 9){
      setLost(true);
    }
  }, [tries])

    /* the person winner */
    useEffect(() => {
     const currentHiddenWord = hiddenWords.split(" ").join("");
     if( currentHiddenWord === words){
        setWinner(true);
     }
     return;
    }, [hiddenWords])
  

  /* validation of words */
  const validateWords = (letter: string) => {
    if (winner) {
      return
    }
    if (lost) {
      return;
    }
    
    if (!words.includes(letter)){
      setTries(Math.min(tries + 1, 9))
      return;
    }

    const hiddenWordsArray = hiddenWords.split(" ");

    for (let i = 0; i < words.length; i++) {
      if (words[i] === letter) {
        hiddenWordsArray[i] = letter
      }
    }
    setHiddenWords(hiddenWordsArray.join(" "));
  }

  const resetGame = () => {
    const newWord = GetRamdomWords();

    setWords(newWord);
    setHiddenWords('_ '.repeat(newWord.length));
    setTries(0);
    setWinner(false);
    setLost(false);
  }

  return (
    <div className="App">
      {/* images */}
      <div className='mx-auto flex flex-col justify-center items-center'>
      <GetImages imageNum={tries} />
      </div>
      {/* Hidden word */}
      <h3 className='font-bold text-2xl my-4 text-blue-600'>{hiddenWords}</h3>
      {/* Counter tries */}
      <h3 className='font-bold text-2xl my-4 text-blue-600'>Intento: {tries}</h3>
      {/* Message lost */}
      { lost ? (
      <h3 className='font-bold text-2xl my-4 text-red-600'>😥 Perdio, su palabra es: {words} </h3>) : (""
      )}
      {/* Message winner */}
      { winner ? (
      <h3 className='font-bold text-2xl my-4 text-green-600'>🏆 Felicidades, usted gano! </h3>) : (""
      )}
      {/* Keyboard */}
      {letters.map((letter) => [
        <button onClick={ () => validateWords(letter) } className='bg-white p-4 rounded-full shadow-md m-2' key={letter}>{letter}</button>
      ])}
  <br />
      {/* Button new game */}
      <button onClick={resetGame} className='mt-6 bg-blue-700 py-4 px-6 rounded-full text-white font-bold text-xl'>Nuevo juego?</button>
      
    </div>
  )
}

export default App
