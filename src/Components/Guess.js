import React from 'react';

import {Button} from "primereact/button";
import useDateHelpers from "../Helpers/DateHelpers";

function Guess({ hasGuessed, onGenerateNewGuess, onGuess }) {

    const {formatWeekDay} = useDateHelpers();

    return hasGuessed
        ? <div className="buttons">
            <Button label="New guess" onClick={() => onGenerateNewGuess()} />
        </div>
        : <div className="buttons">
            {[...Array(7)].map((_, i) =>
                <Button key={i} label={formatWeekDay(i)} onClick={() => onGuess(i)} />
            )}
        </div>
    ;
}

export default Guess;