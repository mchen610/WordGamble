import "./PlayPage.css";
import { useState, useEffect } from "react";
import { Button } from "./Buttons";
import { SlotMachine } from "./SlotMachine";
import Footer from "./Footer";
import Header from "./Header";

//https://stackoverflow.com/questions/54895883/reset-to-initial-state-with-react-hooks

let numColumns = 6;

export default function PlayPage() {
    const [validWords, setValidWords] = useState<string[]>([]);
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const [newValidWords, setNewValidWords] = useState<string[]>([]);
    const [pointsIndex, setPointsIndex] = useState<number>(0);

    const addValidWords = (words: string[]) => {
        if (words.length > 0) {
            setValidWords(validWords.concat(words));
            setNewValidWords(words);
            setTotalPoints((prevPoints) => prevPoints + Math.floor(words[0].length ** 1.5) * 10);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (pointsIndex < newValidWords.length - 1) {
                setTotalPoints((prevPoints) => prevPoints + Math.floor(newValidWords[pointsIndex + 1].length ** 1.5) * 10);
                setPointsIndex((prevIndex) => prevIndex + 1);
            }
        }, 100);
    }, [totalPoints]);

    const [animation, setAnimation] = useState<string>("none");

    useEffect(() => {
        if (validWords.length > 0) {
            setAnimation(`breathing 0.1s ${newValidWords.length} ease-in, word-pop 0.1s ${newValidWords.length} linear`);
        }
    }, [validWords]);

    //changing machine key resets all props in machine
    const [machineKey, setMachineKey] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const startNewGame = () => {
        setStartTime(performance.now());
        setMachineKey(machineKey + 1);
        setAnimation("none");
        setPointsIndex(0);
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
                <SlotMachine startTime={startTime} numColumns={numColumns} key={machineKey} addValidWords={addValidWords} />

                {startTime === 0 && <Button className="play-button" imgLink="images/play-button.svg" onClickHandler={startNewGame} />}

                {startTime > 0 && (
                    <div className="retry-container" style={{ top: `${50 + numColumns * 5.5}vh` }}>
                        <Button className="retry-button" imgLink="images/retry-button.png" onClickHandler={startNewGame} />
                    </div>
                )}
            </div>

            <Footer mode="dark" />
        </>
    );
}
