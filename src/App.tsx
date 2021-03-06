import React from 'react';
import './App.scss';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {useState} from "react";
import Breakdown from "./Components/Breakdown";
import useDateHelpers from "./Helpers/DateHelpers";
import Guess from "./Components/Guess";
import Status from "./Components/Status";

function App() {
  const {formatDate, generateDate} = useDateHelpers();
  const [dateToGuess, setDateToGuess] = useState(generateDate());
  const [guessedDay, setGuessedDay] = useState<number | null>(null);
  const [startGuessingTime, setStartGuessingTime] = useState(new Date().getTime());

  const onGuess = (day: number): void => {
    setGuessedDay(day);
  };

  const onGenerateNewGuess = () => {
    setStartGuessingTime(new Date().getTime());
    setDateToGuess(generateDate());
    setGuessedDay(null);
  };

  return (
      <div className="app-wrapper">
        <div className="app">
          <div className="call-to-action">What was the day of the week for this date?</div>
          <div className="date-to-guess" data-testid="date-to-guess">{formatDate(dateToGuess)}</div>
          <Status
            guessedDay={guessedDay}
            dateToGuess={dateToGuess}
            startGuessingTime={startGuessingTime}
          />
          <Guess
              hasGuessed={guessedDay !== null}
              onGenerateNewGuess={onGenerateNewGuess}
              onGuess={(day) => onGuess(day)}
          />
          <Breakdown
              hasGuessed={guessedDay !== null}
              dateToGuess={dateToGuess}
          />
        </div>
      </div>
  );
}

export default App;
