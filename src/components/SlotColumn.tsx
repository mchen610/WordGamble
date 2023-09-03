import { useState } from 'react';
import { Letter } from './Letter';
import { Button } from './Buttons';
import classNames from 'classnames';

const letters: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const duration = 3;

function shuffle(list: string[]) {
    return list
        .map((item) => ({ item, value: Math.random() }))
        .sort((a, b) => a.value - b.value)
        .map(({ item }) => item);
}

function newLetterList() {
    let newLetters = shuffle(letters);
    newLetters.push(newLetters[0]);
    newLetters.push(newLetters[1]);
    newLetters.push(newLetters[2]);
    return newLetters;
}



interface ISlotColumnProps {
    newStartTime: DOMHighResTimeStamp;
    handleFinishedCol: (finalColumn: string[]) => void;
}

export const SlotColumn = (
    { newStartTime, handleFinishedCol  } : ISlotColumnProps
) => {
    const [stopped, setStopped] = useState(false);
    const [offset, setOffset] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [letterOrder, setLetterOrder] = useState(newLetterList());

    if (newStartTime != startTime) {
        setStopped(false);
        setStartTime(newStartTime);
    }

    return (
        <div
            style={{
                animationDuration: String(duration) + "s",
                transform: stopped ? `translateY(-${offset}%)` : "",
            }}
            {...(startTime > 0 &&
                !stopped && {
                    onClick: () => {
                        let letterTime = (duration * 1000) / letters.length;
                        let elapsedTime = performance.now() - startTime;
                        let letterIndex =
                            (Math.floor(elapsedTime / letterTime) %
                                letters.length) +
                            1;
                        let newOffset =
                            (letterIndex / letterOrder.length) * 100;
                        setOffset(newOffset);
                        setStopped(true);
                        handleFinishedCol(letterOrder.slice(letterIndex, letterIndex + 3));
                    },
                })}
            className={classNames(
                "slot-container",
                { stopped: stopped },
                { started: startTime > 0 }
            )}
        >
            {letterOrder.map((letter, index) => Letter(letter, index))};
        </div>
    );
};



interface ISlotMachineProps {
    newStartTime: DOMHighResTimeStamp;
    numColumns: number;
    handleFinishedCol: (finishedColumn: string[]) => void;
}

export const SlotMachine = ( { newStartTime, numColumns, handleFinishedCol } : ISlotMachineProps) => {
    const ColumnList = [];
    

    for (let i = 0; i < numColumns; i++) {
        ColumnList.push(<SlotColumn newStartTime={newStartTime} handleFinishedCol={handleFinishedCol} />);
    }
    
    const [startTime, setStartTime] = useState(0);

    return (
        <>
        <div className="machine">
            <span className="machine-front" />
            {ColumnList.map((column) => (<div className="slot">{column}</div>))}
            
            {startTime === 0 && (
                <Button
                    className="button play-button"
                    imgLink="images/play-button.svg"
                    onClickHandler={() =>
                        setStartTime(performance.now())
                    }
                />
            )}
        </div>

        {startTime > 0 && (
            <div className="retry-container">
                <Button
                    className="button retry-button"
                    imgLink="images/retry-button.png"
                    onClickHandler={() => {

                        setStartTime(performance.now());

                    }}
                />
            </div>
        )}
        </>
    )

});