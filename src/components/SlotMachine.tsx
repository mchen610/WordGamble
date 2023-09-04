import { useState, useEffect } from "react";
import { SlotColumn } from "./SlotColumn";
import wordList from "./words.json";
import { Word } from "./Word";



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
            console.log(words[i]);
            realWords.push(words[i]);
        }
    }
    

    return realWords;
};

const newEmptyLists = (numColumns: number) => {
    let newList = [];
    for (let i = 0; i < numColumns; i++) {
        newList.push([]);
    }
    return newList;
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
    const [finalColumnList, setFinalColumnList] = useState<string[][]>(
        newEmptyLists(numColumns)
    );

    const handleFinishedCol = (finalColumn: string[], colIndex: number) => {
        let newList=finalColumnList.slice();
        newList[colIndex] = finalColumn;
        setFinalColumnList(newList);
    };

    const [newValidWords, setNewValidWords] = useState<string[]>([]);


    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (finished===true) {
            console.log(wordList);
            let newWords: string[] = [];
            let risingDiagonal = "";
            let fallingDiagonal = "";

            for (let i = 0; i < numColumns; i++) {
                let row = "";
                for (let j = 0; j < numColumns; j++) {
                    row += finalColumnList[j][i];
                }

                newWords = newWords.concat(wordsIn(row));

                let col = finalColumnList[i].join("");

                newWords = newWords.concat(wordsIn(col));

                risingDiagonal += finalColumnList[i][i];
                fallingDiagonal += finalColumnList[i][numColumns - 1 - i];
            }

            newWords = newWords.concat(wordsIn(risingDiagonal));
            newWords = newWords.concat(wordsIn(fallingDiagonal));
            
            if (newWords.length > 0) {
                setNewValidWords(newWords);
                addValidWords(newWords);
            }
            
        }
    }, [finished]);

    useEffect(() => {
        if (finalColumnList.every(list => list.length > 0) && newValidWords.length === 0) {
            setFinished(true);
        }
    }, [finalColumnList]);

    const ColumnList = [];

    for (let i = 0; i < numColumns; i++) {
        ColumnList.push(
            <SlotColumn
                newStartTime={startTime}
                handleFinishedCol={handleFinishedCol}
                numColumns={numColumns}
                colIndex={i}
            />
        );
    }

    return (
        <>
            {newValidWords.map((word, index) => (
                <div
                    className="word-container"
                    key={word + index}
                    style={{
                        transform: `rotate(${index % 2 === 0 ? -30 : 30}deg)`,
                        top: `${30 + index * 10}%`,
                        left: `${index % 2 === 0 ? 70 : 20}%`,
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
