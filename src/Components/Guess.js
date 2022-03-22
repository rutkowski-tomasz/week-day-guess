import React from 'react';

import {Button} from "primereact/button";
import useDateHelpers from "../Helpers/DateHelpers";
import {Dropdown} from "primereact/dropdown";

function Guess({ hasGuessed, onGenerateNewGuess, onGuess }) {

    const {formatWeekDay} = useDateHelpers();

    const dropdownItems = [...Array(7)].map((_, i) => ({ label: formatWeekDay(i), value: i }));

    return hasGuessed
        ? <div className="buttons">
            <Button label="New guess" onClick={() => { console.log('tse'); return onGenerateNewGuess() }} />
        </div>
        : <>
            <div className="buttons full">
                {[...Array(7)].map((_, i) =>
                    <Button key={i} label={formatWeekDay(i)} onClick={() => onGuess(i)} />
                )}
            </div>
            <div className="buttons mobile">
                <Dropdown options={dropdownItems} onChange={(e) => onGuess(e.value)} placeholder="Select day of the week"/>
            </div>
        </>

    ;
}

export default Guess;