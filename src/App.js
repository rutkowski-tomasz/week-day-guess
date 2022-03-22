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
  const [startGuessingTime, setStartGuessingTime] = useState(new Date().getTime());

  const guess = (day) => {
    setGuessedDay(day);
  };

  const newGuess = () => {
    setStartGuessingTime(new Date().getTime());
    setDateToGuess(generateDate());
    setGuessedDay(null);
  };

  const getStatus = () => {
    if (guessedDay === null)
      return null;

    const guessTime = Math.floor((new Date().getTime() - startGuessingTime) / 1000);

    return guessedDay === dateToGuess.getDay()
        ? <div className="correct">Correct, it was <b>{formatWeekDay(guessedDay)}</b>, guess took {guessTime} seconds</div>
        : <div className="incorrect">Incorrect, it was not {formatWeekDay(guessedDay)}. It was <b>{formatWeekDay(dateToGuess.getDay())}</b>, guess took <b>{guessTime}</b>s</div>;
  };

  const guessedBlock = guessedDay !== null ? <div className="buttons">
    <Button label="New guess" onClick={newGuess} />
  </div> : null;

  const guessBlock = guessedDay === null ? <div className="buttons">
    {[...Array(7)].map((_, i) =>
        <Button key={i} label={formatWeekDay(i)} onClick={() => guess(i)} />
    )}
  </div> : null;

  const isLeap = year => new Date(year, 1, 29).getDate() === 29;

  const getReferenceDate = (month, year) => {
    switch (month) {
      case 0: return !isLeap(year) ? 3 : 4;
      case 1: return !isLeap(year) ? 28 : 29;
      case 2: return 14;
      case 3: return 4;
      case 4: return 9;
      case 5: return 6;
      case 6: return 11;
      case 7: return 8;
      case 8: return 5;
      case 9: return 10;
      case 10: return 7;
      case 11: return 12;
      default: throw new Error(`Invalid month ${month}`);
    }
  };

  const getCenturyReference = (year) => {
    year = Math.floor(year / 100) * 100;

    while (year < 2000) {
      year += 400;
    }
    while (year > 2300) {
      year -= 400;
    }

    return year;
  };

  const getCenturyOffset = (yearReference) => {

    switch (yearReference) {
      case 2000: return 2;
      case 2100: return 0;
      case 2200: return 5;
      case 2300: return 3;
      default: throw new Error(`Invalid year reference ${yearReference}`);
    }
  };

  const getBreakdownBlock = () => {
    const date = dateToGuess.getDate().toString().padStart(2, '0');
    const month = (dateToGuess.getMonth() + 1).toString().padStart(2, '0');

    const referenceDate = getReferenceDate(dateToGuess.getMonth(), dateToGuess.getFullYear());
    let dateOffset = (date - referenceDate) % 7;
    while (dateOffset < 0) {
      dateOffset += 7;
    }

    const century = Math.floor(dateToGuess.getFullYear() / 100) * 100;
    const centuryReference = getCenturyReference(dateToGuess.getFullYear());
    const centuryOffset = getCenturyOffset(centuryReference);

    const decade = dateToGuess.getFullYear() - century;
    const twelveYearsCount = Math.floor(decade / 12);
    const twelveRest = decade - (twelveYearsCount * 12);
    const restLeapYears = Math.floor(twelveRest / 4);
    const sum = dateOffset + centuryOffset + twelveYearsCount + twelveRest + restLeapYears;
    let day = sum;
    while (day > 6) {
      day -= 7;
    }

    return <div className="breakdown">
      {guessedDay !== null ?
          <div className="breakdown-content">
            <div className="entry">
              <div className="element">{date}.{month} is </div>
              <div className="value"><b>+{dateOffset}</b> to {referenceDate}.{month}</div>
            </div>
            <div className="entry">
              <div className="element">{century} is </div>
              <div className="value"><b>+{centuryOffset}</b> same as {centuryReference}</div>
            </div>
            <div className="entry">
              <div className="element">{decade} has </div>
              <div className="value"><b>+{twelveYearsCount}</b> twelve years</div>
            </div>
            <div className="entry">
              <div className="element">{decade} has </div>
              <div className="value"><b>+{twelveRest}</b> rest from twelve division</div>
            </div>
            <div className="entry">
              <div className="element">{twelveRest} has </div>
              <div className="value"><b>+{restLeapYears}</b> leap years</div>
            </div>
            <div className="entry sum">
              <div className="element">&nbsp;</div>
              <div className="value"><b>+{sum}</b> ({day})</div>
            </div>
          </div>
      : null}
    </div>
  };

  return (
      <div className="app-wrapper">
        <div className="app">
          <div className="call-to-action">What was the day of the week for this date?</div>
          <div className="date-to-guess">{formatDate(dateToGuess)}</div>
          <div className="status">
            {getStatus()}
          </div>
          {guessedBlock}
          {guessBlock}
          {getBreakdownBlock()}
        </div>
      </div>
  );
}

export default App;
