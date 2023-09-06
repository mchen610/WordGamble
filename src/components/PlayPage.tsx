import "./PlayPage.css";
import { useState, useEffect } from "react";
import { Button } from "./Buttons";
import { SlotMachine } from "./SlotMachine";
import Footer from "./Footer";
import Header from "./Header";

//https://stackoverflow.com/questions/54895883/reset-to-initial-state-with-react-hooks

let numColumns = 7;

export default function PlayPage() {
    const [validWords, setValidWords] = useState<string[]>([]);
    const [totalPoints, setTotalPoints] = useState<number>(0);

    const addValidWords = (words: string[]) => {
        setValidWords(validWords.concat(words));
        for (var word of words) {
            setTotalPoints(totalPoints + Math.floor(word.length ** 1.5) * 10);
        }
    };

    const [animation, setAnimation] = useState<string>("none");

    useEffect(() => {
        if (validWords.length > 0) {
            setAnimation(`breathing 0.1s ease-in, word-pop 0.5s linear`);
        }
    }, [validWords]);

    //changing machine key resets all props in machine
    const [machineKey, setMachineKey] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const startNewGame = () => {
        setStartTime(performance.now());
        setMachineKey(machineKey + 1);
        setAnimation("none");
        /*if (startTime > 0) {
            numColumns = Math.floor(Math.random() * 4) + 3;
        }*/
    };

    return (
        <>
            <title>Play</title>
            <Header mode="light" />
            <div className="play-container">
                <span className="play-bg" />
                <div
                    className="points"
                    style={{
                        top: `${35 - numColumns * 5.3}vh`,
                        animation: animation,
                    }}
                >
                    {totalPoints}
                </div>
                <SlotMachine
                    startTime={startTime}
                    numColumns={numColumns}
                    key={machineKey}
                    addValidWords={addValidWords}
                />

                {startTime === 0 && (
                    <Button
                        className="play-button"
                        imgLink="images/play-button.svg"
                        onClickHandler={startNewGame}
                    />
                )}

                {startTime > 0 && (
                    <div
                        className="retry-container"
                        style={{ top: `${50 + numColumns * 5.5}vh` }}
                    >
                        <Button
                            className="retry-button"
                            imgLink="images/retry-button.png"
                            onClickHandler={startNewGame}
                        />
                    </div>
                )}
            </div>

            <Footer mode="dark" />
        </>
    );
}
