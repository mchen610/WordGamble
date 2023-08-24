import "./PlayPage.css";
import { useState } from "react";
import classNames from "classnames";
import { Button } from "./Buttons";
import CSS from "csstype";

const letters: string[] = "ABCDEFGHIJK".split("");
const duration = 10;
const durationStyle: CSS.Properties = {
    animationDuration: String(duration) + "s",
};

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

function checkTime() {
    console.log("HIIIIIIIII");
    console.timeEnd("hi");
    return "hi";
}

function slotCol(list: string[], startTime: DOMHighResTimeStamp) {
    const [stopped, setStopped] = useState(false);

    return (
        <div
            style={durationStyle}
            onClick={() => {

                // ms/letter - elapsed % ms/letter
                let waitTime =
                    (duration * 1000) / letters.length -
                    ((performance.now() - startTime) %
                        ((duration * 1000) / letters.length));
                setTimeout(() => setStopped(true), waitTime);
                console.log(waitTime);
                console.time("hi"); 
            }}
            className={classNames(
                "slot-container",
                { stopped: stopped },
                { started: startTime > 0 }
            )}
            key={checkTime()}
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
                    <span className="bg" />
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
