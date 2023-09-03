import { useState, useEffect } from "react";
import { SlotColumn } from "./SlotColumn";
import rawWords from "./words.txt";
import { randAngle, randLeft, randTop } from "./Random";
import { Word } from "./Word";

let wordList: string[] = [];

fetch(rawWords)
    .then((response) => response.text())
    .then((content) => {
        wordList = content.split("\r\n");
    })
    .catch((error) => {
        console.error("Error fetching file:", error);
    });

const wordsIn = (word: string) => {
    let words: string[] = [];
    for (let j = 0; j < word.length - 1; j++) {
        for (let k = 2; k <= word.length - j; k++) {
            let newWord = word.substring(j, j + k);
            words.push(newWord);
        }
    }

    let realWords: string[] = [];
    for (let i = 0; i < words.length; i++) {
        if (wordList.includes(words[i])) {
            realWords.push(words[i]);
        }
    }
    return realWords;
};

interface ISlotMachineProps {
    numColumns: number;
    startTime: DOMHighResTimeStamp;
    addValidWords: (words: string[]) => void;
}

export const SlotMachine = ({
    numColumns,
    startTime,
    addValidWords,
}: ISlotMachineProps) => {
    const [finalColumnList, setFinalColumnList] = useState<string[][]>([]);

    const handleFinishedCol = (finalColumn: string[]) => {
        setFinalColumnList([...finalColumnList, finalColumn]);
    };

    const [newValidWords, setNewValidWords] = useState<string[]>([]);

    const addNewValidWords = (word: string) => {
        setNewValidWords((prevValidWords) =>
            prevValidWords.concat(wordsIn(word))
        );
        addValidWords(wordsIn(word));
    };

    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (
            finalColumnList.length === numColumns &&
            newValidWords.length === 0
        ) {
            setFinished(true);
        }
    }, [finalColumnList]);

    useEffect(() => {
        if (finished) {
            let risingDiagonal = "";
            let fallingDiagonal = "";

            for (let i = 0; i < numColumns; i++) {
                let row = "";
                for (let j = 0; j < numColumns; j++) {
                    row += finalColumnList[j][i];
                }

                addNewValidWords(row);

                let col = finalColumnList[i].join("");

                addNewValidWords(col);

                risingDiagonal += finalColumnList[i][i];
                fallingDiagonal += finalColumnList[i][numColumns - 1 - i];
            }

            addNewValidWords(risingDiagonal);
            addNewValidWords(fallingDiagonal);
        }
    }, [finished]);

    const ColumnList = [];

    for (let i = 0; i < numColumns; i++) {
        ColumnList.push(
            <SlotColumn
                newStartTime={startTime}
                handleFinishedCol={handleFinishedCol}
                numColumns={numColumns}
            />
        );
    }

    return (
        <>
            {newValidWords.map((word, index) => (
                <div
                    className="word-container"
                    key={word+index}
                    style={{
                        transform: `rotate(${randAngle()}deg)`,
                        top: `${randTop()}%`,
                        left: `${randLeft()}%`,
                    }}
                >
                    {Word(word)}
                </div>
            ))}
            <div
                className="machine"
                style={{
                    width: `${(17 * numColumns) / 3}vw`,
                    height: `${(16 * numColumns) / 3}vw`,
                }}
            >
                <span className="machine-front" />
                <div className="columns-container">
                    {ColumnList.map((column, index) => (
                        <div className="slot" key={index}>
                            {column}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
