import './App.css';
import {Button} from 'primereact/button';

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import {useState} from "react"; //icons

const generateDate = (startYear = 1200, endYear = 2300) => {
  const startDate = new Date(startYear, 1, 1);
  const endDate = new Date(endYear, 12, 31);

  const diff = endDate.getTime() - startDate.getTime();
  return new Date(startDate.getTime() + (Math.random() * diff));
};

const formatDate = (date) => {
  const day = (date.getDate()).toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}.${month}.${date.getFullYear()}`;
};

const formatWeekDay = (day) => {
  switch (day) {
    case 0: return 'Sunday';
    case 1: return 'Monday';
    case 2: return 'Tuesday';
    case 3: return 'Wednesday';
    case 4: return 'Thursday';
    case 5: return 'Friday';
    case 6: return 'Saturday';
    default: return 'Unknown day';
  }
};

function App() {
  const [dateToGuess, setDateToGuess] = useState(generateDate());
  const [guessedDay, setGuessedDay] = useState(null);

  const guess = (day) => {
    setGuessedDay(day);
  };

  const newGuess = () => {
    setDateToGuess(generateDate());
    setGuessedDay(null);
  };

  const guessedBlock = guessedDay !== null ? <div>
    {guessedDay === dateToGuess.getDay()
        ? <div>Correct, it was <b>{formatWeekDay(guessedDay)}</b></div>
        : <div>Incorrect, it was not {formatWeekDay(guessedDay)}. It was <b>{formatWeekDay(dateToGuess.getDay())}</b></div>
    }
    <Button label="New guess" onClick={newGuess} />
  </div> : null;

  const guessBlock = guessedDay === null ? <div>
    {[...Array(7)].map((_, i) =>
        <Button key={i} label={formatWeekDay(i)} onClick={() => guess(i)} />
    )}
  </div> : null;

  return (
    <div className="App">
      <div>What was the day of the week for this date?</div>
      {formatDate(dateToGuess)}
      {guessedBlock}
      {guessBlock}
    </div>
  );
}

export default App;
