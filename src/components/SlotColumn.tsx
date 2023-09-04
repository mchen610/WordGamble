import { useState } from "react";
import { Letter } from "./Word";
import classNames from "classnames";

const letters: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const duration = 9;

function shuffle(list: string[]) {
    return list
        .map((item) => ({ item, value: Math.random() }))
        .sort((a, b) => a.value - b.value)
        .map(({ item }) => item);
}

function newLetterList() {
    let newLetters = shuffle(letters);
    return newLetters.concat(newLetters);
}

interface ISlotColumnProps {
    newStartTime: DOMHighResTimeStamp;
    handleFinishedCol: (finalColumn: string[]) => void;
    numColumns: number;
}

export const SlotColumn = ({
    newStartTime,
    handleFinishedCol,
    numColumns,
}: ISlotColumnProps) => {
    const [stopped, setStopped] = useState(false);
    const [offset, setOffset] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [letterOrder] = useState(newLetterList());

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
                        handleFinishedCol(
                            letterOrder.slice(
                                letterIndex,
                                letterIndex + numColumns
                            )
                        );
                    },
                })}
            className={classNames(
                "slot-container",
                { stopped: stopped },
                { started: startTime > 0 }
            )}
        >
            {letterOrder.map((letter, index) => Letter(letter, index))}
        </div>
    );
};
