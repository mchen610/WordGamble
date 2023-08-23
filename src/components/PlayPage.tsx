import "./PlayPage.css";
import { useState } from "react";
import classNames from "classnames";
import { Button } from "./Buttons";

const letters: string[] = "ABCDEFGHIJK".split("");

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

function slotCol(list: string[], startTime: DOMHighResTimeStamp) {
    const [stopped, setStopped] = useState(false);
    return (
        <div
            className={classNames(
                "slot-container",
                { stopped: stopped },
                { started: startTime > 0 }
            )
            
        }
  
            onClick={() => {
                setTimeout(
                    () => setStopped(true),
                    10000 / letters.length -
                        ((performance.now() - startTime) %
                            (10000 / letters.length))
                );
            }}
        >
            {list.map((letter, index) => (
                <img
                    src={"images/" + letter + ".svg"}
                    alt={"This was the letter " + { letter }}
                    key={index}
                />
            ))}
        </div>
    );
}

const leftList = newletterList();
const midList = newletterList();
const rightList = newletterList();

export default function PlayPage() {
    const [startTime, setStartTime] = useState(0);

    return (
        <>
            <title>Play</title>
            <div>
                <div className="machine">
                    <span className="bg"><img src="images/machine-bg.png"/></span>
                    <div className="slot left">
                        {slotCol(leftList, startTime)}
                    </div>
                    <div className="slot mid">
                        {slotCol(midList, startTime)}
                    </div>
                    <div className="slot right">
                        {slotCol(rightList, startTime)}
                    </div>
                    <div className="line" />

                </div>
                {startTime === 0 && (
                    <Button
                        className="rounded button breathing play-button"
                        img_link="images/play-button.svg"
                        func={() => setStartTime(performance.now())}
                    />
                )}
            </div>

        </>
    );
}
