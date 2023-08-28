import "./PlayPage.css";
import { useState } from "react";
import classNames from "classnames";
import { Button } from "./Buttons";

const letters: string[] = "ABCDEFGHIJK".split("");
const duration = 2;

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

    const [finalLeft, setFinalLeft] = useState(listDict["left"].slice(0, 3));

    const [finalCenter, setFinalCenter] = useState(
        listDict["center"].slice(0, 3)
    );

    const [finalRight, setFinalRight] = useState(listDict["right"].slice(0, 3));

    function slotCol(
        place: "left" | "center" | "right",
        newStartTime: DOMHighResTimeStamp
    ) {
        const list = listDict[place];
        const [stopped, setStopped] = useState(false);
        const [offset, setOffset] = useState(0);
        const [startTime, setStartTime] = useState(0);

        function setFinal(
            place: "left" | "center" | "right",
            letterIndex: number
        ) {
            if (place === "left") {
                setFinalLeft(
                    listDict["left"].slice(letterIndex, letterIndex + 3)
                );
            } else if (place === "center") {
                setFinalCenter(
                    listDict["center"].slice(letterIndex, letterIndex + 3)
                );
            } else if (place === "right") {
                setFinalRight(
                    listDict["right"].slice(letterIndex, letterIndex + 3)
                );
            }
        }

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
                                Math.floor(elapsedTime / letterTime) %
                                letters.length + 1;
                            let newOffset =
                                ((letterIndex) / list.length) * 100;
                            console.log(newOffset);
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
                {list.map((letter, index) => (
                    <img
                        src={"images/letters/" + letter + ".svg"}
                        alt={"This was the letter " + { letter }}
                        key={index}
                    />
                ))}
            </div>
        );
    }

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
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
