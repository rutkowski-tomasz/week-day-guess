import React from 'react';
import useDateHelpers from "../Helpers/DateHelpers";
import './Status.scss';

interface StatusProps {
    dateToGuess: Date;
    guessedDay: number | null;
    startGuessingTime: number;
}

function Status({ dateToGuess, guessedDay, startGuessingTime }: StatusProps) {

    const {formatWeekDay} = useDateHelpers();

    const getStatus = () => {

        if (guessedDay === null)
            return null;

        const guessTime = Math.floor((new Date().getTime() - startGuessingTime) / 1000);

        return guessedDay === dateToGuess.getDay()
            ? <div className="correct">Correct, it was <b>{formatWeekDay(guessedDay)}</b>, guess took {guessTime} seconds</div>
            : <div className="incorrect">Incorrect, it was not {formatWeekDay(guessedDay)}. It was <b>{formatWeekDay(dateToGuess.getDay())}</b>, guess took {guessTime}s</div>;
    };

    return <div className="status">
        {getStatus()}
    </div>
}

export default Status;
