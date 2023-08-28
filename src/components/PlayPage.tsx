import "./PlayPage.css";
import { useState } from "react";
import classNames from "classnames";
import rawWords from "./words.txt";
import { Button } from "./Buttons";

//https://stackoverflow.com/questions/54895883/reset-to-initial-state-with-react-hooks

const letters: string[] = "ABCDEFGHIJK".split("");
const duration = 5;
let words: string[] = [];

await fetch(rawWords)
    .then((response) => response.text())
    .then((content) => {
        words = content.split("\r\n");
    })
    .catch((error) => {
        console.error("Error fetching file:", error);
    });

function shuffle(list: string[]) {
    return list
        .map((item) => ({ item, value: Math.random() }))
        .sort((a, b) => a.value - b.value)
        .map(({ item }) => item);
}

function newletterList() {
    let newLetters = shuffle(letters);
    newLetters.push(newLetters[0]);
    newLetters.push(newLetters[1]);
    newLetters.push(newLetters[2]);
    return newLetters;
}

export default function PlayPage() {
    const [listDict, setListDict] = useState({
        left: newletterList(),
        center: newletterList(),
        right: newletterList(),
    });

    const [finalLeft, setFinalLeft] = useState<string[]>([]);

    const [finalCenter, setFinalCenter] = useState<string[]>([]);

    const [finalRight, setFinalRight] = useState<string[]>([]);

    const [finalWords, setFinalWords] = useState<string[]>([]);

    const [finished, setFinished] = useState(false);

    const [validWords, setValidWords] = useState<string[]>([]);

    const handleFinished = () => {
        //horizontal
        for (let i = 0; i < finalCenter.length; i++) {
            setFinalWords((prevWords) => [
                ...prevWords,
                finalLeft[i] + finalCenter[i] + finalRight[i],
            ]);
        }

        //vertical
        setFinalWords((prevWords) => [
            ...prevWords,
            finalLeft.join(""),
            finalCenter.join(""),
            finalRight.join(""),
        ]);

        //diagonal
        setFinalWords((prevWords) => [
            ...prevWords,
            finalLeft[0] + finalCenter[1] + finalRight[2],
        ]);
        setFinalWords((prevWords) => [
            ...prevWords,
            finalLeft[2] + finalCenter[1] + finalRight[0],
        ]);
    };

    if (
        finalWords.length === 0 &&
        finalLeft.length > 0 &&
        finalCenter.length > 0 &&
        finalRight.length > 0
    ) {
        handleFinished();
        setFinished(true);
    } else if (finished && validWords.length === 0) {
        for (let i = 0; i < finalWords.length; i++) {
            if (words.includes(finalWords[i])) {
                setValidWords((prevValidWords) => [...prevValidWords, finalWords[i]]);
            }
        }
    }

    const setFinal = (
        place: "left" | "center" | "right",
        letterIndex: number
    ) => {
        if (place === "left") {
            setFinalLeft(listDict["left"].slice(letterIndex, letterIndex + 3));
        } else if (place === "center") {
            setFinalCenter(
                listDict["center"].slice(letterIndex, letterIndex + 3)
            );
        } else if (place === "right") {
            setFinalRight(
                listDict["right"].slice(letterIndex, letterIndex + 3)
            );
        }
    };

    const slotCol = (
        place: "left" | "center" | "right",
        newStartTime: DOMHighResTimeStamp
    ) => {
        const [stopped, setStopped] = useState(false);
        const [offset, setOffset] = useState(0);
        const [startTime, setStartTime] = useState(0);

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
                                (letterIndex / listDict[place].length) * 100;
                            console.log(newOffset);
                            console.log(letterIndex);
                            setOffset(newOffset);
                            setStopped(true);
                            setFinal(place, letterIndex);
                        },
                    })}
                className={classNames(
                    "slot-container",
                    { stopped: stopped },
                    { started: startTime > 0 }
                )}
            >
                {listDict[place].map((letter, index) => (
                    <img
                        src={"images/letters/" + letter + ".svg"}
                        alt={"This was the letter " + { letter }}
                        key={index}
                    />
                ))}
            </div>
        );
    };

    const [startTime, setStartTime] = useState(0);

    return (
        <>
            <title>Play</title>
            <div className="play-container">
                <div className="machine">
                    <span className="bg" />
                    <div className="slot left">
                        {slotCol("left", startTime)}
                    </div>
                    <div className="slot mid">
                        {slotCol("center", startTime)}
                    </div>
                    <div className="slot right">
                        {slotCol("right", startTime)}
                    </div>
                    <div className="line" />
                    {startTime === 0 && (
                        <Button
                            className="button breathing play-button"
                            img_link="images/play-button.svg"
                            func={() => setStartTime(performance.now())}
                        />
                    )}
                </div>

                {startTime > 0 && (
                    <div className="retry-container">
                        <Button
                            className="button breathing retry-button"
                            img_link="images/retry-button.png"
                            func={() => {
                                setListDict({
                                    left: newletterList(),
                                    center: newletterList(),
                                    right: newletterList(),
                                });
                                setStartTime(performance.now());
                                setFinalLeft([]);
                                setFinalCenter([]);
                                setFinalRight([]);
                                setFinalWords([]);
                                setFinished(false);
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
