import "./PlayPage.css";
import { useState } from "react";
import { Button } from "./Buttons";
import { SlotMachine } from "./SlotMachine";
import Footer from "./Footer";
import Header from "./Header";

//https://stackoverflow.com/questions/54895883/reset-to-initial-state-with-react-hooks


export default function PlayPage() {
    const [validWords, setValidWords] = useState<string[]>([]);

    const addValidWords = (words: string[]) => {
        setValidWords(validWords.concat(words));
    };

    const [startTime, setStartTime] = useState(0);

    //changing machine key resets all props in machine
    const [machineKey, setMachineKey] = useState(0);

    const startNewGame = () => {
        setStartTime(performance.now());
        setMachineKey(machineKey + 1);
    };

    return (
        <>
            <title>Play</title>
            <Header mode="light" />
            <div className="play-container">
                <span className="play-bg" />

                <SlotMachine
                    startTime={startTime}
                    numColumns={5}
                    key={machineKey}
                    addValidWords={addValidWords}
                />

                {startTime === 0 && (
                    <Button
                        className="button play-button"
                        imgLink="images/play-button.svg"
                        onClickHandler={startNewGame}
                    />
                )}

                {startTime > 0 && (
                    <div className="retry-container">
                        <Button
                            className="button retry-button"
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
