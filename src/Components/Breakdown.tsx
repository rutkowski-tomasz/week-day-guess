import React from 'react';
import './Breakdown.scss';
import useDateHelpers from "../Helpers/DateHelpers";

interface BreakdownProps {
    hasGuessed: boolean;
    dateToGuess: Date;
}

function Breakdown({ hasGuessed, dateToGuess }: BreakdownProps) {

    const { isLeap } = useDateHelpers();

    const getReferenceDate = (month: number, year: number): number => {
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

    const getCenturyReference = (year: number): number => {
        year = Math.floor(year / 100) * 100;

        while (year < 2000) {
            year += 400;
        }
        while (year > 2300) {
            year -= 400;
        }

        return year;
    };

    const getCenturyOffset = (yearReference: number): number => {

        switch (yearReference) {
            case 2000: return 2;
            case 2100: return 0;
            case 2200: return 5;
            case 2300: return 3;
            default: throw new Error(`Invalid year reference ${yearReference}`);
        }
    };

    const date = dateToGuess.getDate().toString().padStart(2, '0');
    const month = (dateToGuess.getMonth() + 1).toString().padStart(2, '0');

    const referenceDate = getReferenceDate(dateToGuess.getMonth(), dateToGuess.getFullYear());
    const dateOffset = dateToGuess.getDate() - referenceDate;

    let dateAlignedOffset = dateOffset % 7;
    if (dateAlignedOffset < 0) {
        dateAlignedOffset += 7;
    }

    const century = Math.floor(dateToGuess.getFullYear() / 100) * 100;
    const centuryReference = getCenturyReference(dateToGuess.getFullYear());
    const centuryOffset = getCenturyOffset(centuryReference);

    const decade = dateToGuess.getFullYear() - century;
    const twelveYearsCount = Math.floor(decade / 12);
    const twelveRest = decade - (twelveYearsCount * 12);
    const restLeapYears = Math.floor(twelveRest / 4);
    const sum = dateAlignedOffset + centuryOffset + twelveYearsCount + twelveRest + restLeapYears;
    const day = sum % 7;

    return <div className={`breakdown ${hasGuessed ? 'guessed' : ''}`}>
        {hasGuessed ?
            <div className="breakdown-content">
                <div className="entry">
                    <div className="element">{date}.{month} is </div>
                    <div className="value"><b>+{dateAlignedOffset}</b> ({dateOffset > 0 ? '+' + dateOffset : dateOffset}) to {referenceDate}.{month}</div>
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
                    <div className="value"><b>{sum > 0 ? '+' + sum : sum}</b> ({day})</div>
                </div>
            </div>
            : null}
    </div>
}

export default Breakdown;