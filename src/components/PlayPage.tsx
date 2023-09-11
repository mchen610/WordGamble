import "./PlayPage.css";
import { useState, useEffect } from "react";
import { Button } from "./Buttons";
import { SlotMachine } from "./SlotMachine";
import Footer from "./Footer";
import Header from "./Header";

//https://stackoverflow.com/questions/54895883/reset-to-initial-state-with-react-hooks

let numColumns = 6;
const speed = 5;

export default function PlayPage() {
    const [validWords, setValidWords] = useState<string[]>([]);
    const [totalPoints, setTotalPoints] = useState<number>(0);

    const [machineKey, setMachineKey] = useState(0);
    const [startTime, setStartTime] = useState(0);

    const [newValidWords, setNewValidWords] = useState<string[]>([]);
    const [numUnique, setNumUnique] = useState<number>(0);
    const [pointsIndex, setPointsIndex] = useState<number>(0);
    const [animation, setAnimation] = useState<string>("none");

    const addPoints = (words: string[]) => {
        if (pointsIndex < words.length) {
            let currentIndex = pointsIndex;
            let basePoints = Math.floor(words[currentIndex].length ** 1.5) * 10;
            let newPoints = totalPoints + basePoints;
            while (currentIndex < words.length - 1 && words[currentIndex] === words[currentIndex + 1]) {
                newPoints += basePoints;
                currentIndex++;
            }
            setPointsIndex(currentIndex + 1);
            setTotalPoints(newPoints);
            setNumUnique((prevNum) => prevNum + 1);
        }
    };

    const addValidWords = (words: string[]) => {
        if (words.length > 0) {
            setValidWords(validWords.concat(words));
            setNewValidWords([...words]);
            addPoints(words);
            console.log(words);
        }
    };

    useEffect(() => {
        if (newValidWords.length > 0) {
            setTimeout(() => {
                addPoints(newValidWords);
            }, speed * 100);
        }
    }, [totalPoints]);

    useEffect(() => {
        if (numUnique > 0) {
            setAnimation(`bulge ${speed / 10}s ${numUnique} ease-in, word-pop ${speed / 10}s ${numUnique} ease-in`);
        }
    }, [numUnique]);

    const startNewGame = () => {
        //changing machine key resets all props in machine
        setMachineKey(machineKey + 1);
        setStartTime(performance.now());

        setNewValidWords([]);
        setNumUnique(0);
        setPointsIndex(0);
        setAnimation("none");
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
