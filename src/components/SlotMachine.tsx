import { useState, useEffect } from "react";
import { SlotColumn } from "./SlotColumn";
import wordList from "./words.json";
import { Letter, Word } from "./Word";
import "./SlotMachine.css";

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

export const SlotMachine = ({ numColumns, startTime, addValidWords }: ISlotMachineProps) => {
    const [finalColumnList, setFinalColumnList] = useState<string[][]>(newEmptyLists(numColumns));

    const [wordsInLetters, setWordsInLetters] = useState<string[][][]>(() => {
        let newList: string[][][] = newEmptyLists(numColumns);
        for (let i = 0; i < numColumns; i++) {
            for (let j = 0; j < numColumns; j++) {
                newList[i].push([]);
            }
        }
        return newList;
    });
    const [newValidWords, setNewValidWords] = useState<string[]>([]);

    const [finished, setFinished] = useState(false);

    const getAnimations = (row: number, col: number) => {
        let words: string[] = wordsInLetters[row][col];
        let animations: string = "";
        let extraDelay = 0;
        for(let i = 0; i < words.length; i++) {
            let delay = newValidWords.indexOf(words[i]);
            if (i > 0) {
                animations = ", "+animations;
            }
            animations = `word-highlight 2s ${delay+extraDelay}s`+animations;
            extraDelay += 2;
            

        }
        return animations;
    }

    const wordsIn = (word: string, type: string, row: number, col: number) => {
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

                setWordsInLetters((prevList) => {
                    let index = word.indexOf(words[i]);
                    for (let j = index; j < index + words[i].length; j++) {
                        let newRow = row;
                        let newCol = col;
                        if (type == "row") {
                            newRow += j;
                        }

                        if (type == "col") {
                            newCol += j;
                        }

                        if (type == "risingDiagonal") {
                            newRow += j;
                            newCol += j;
                        }

                        if (type == "fallingDiagonal") {
                            newRow += j;
                            newCol -= j;
                        }

                        prevList[newRow][newCol].push(words[i]);
                    }

                    return prevList;
                });
            }
        }

        return realWords;
    };

    const handleFinishedCol = (finalColumn: string[], colIndex: number) => {
        let newList = finalColumnList.slice();
        newList[colIndex] = finalColumn;
        setFinalColumnList(newList);
    };

    useEffect(() => {
        if (finished === true) {
            let newWords: string[] = [];

            for (let i = 0; i < numColumns; i++) {
                let row = "";
                for (let j = 0; j < numColumns; j++) {
                    row += finalColumnList[j][i];
                }

                setNewValidWords((prev) => [...prev, ...wordsIn(row, "row", 0, i)]);

                let col = finalColumnList[i].join("");

                setNewValidWords((prev) => [...prev, ...wordsIn(col, "col", i, 0)]);
            }

            for (let i = 0; i < numColumns - 1; i++) {
                let risingDiagonal = "";
                let fallingDiagonal = "";
                for (let j = 0; j < numColumns - i; j++) {
                    risingDiagonal += finalColumnList[j][j + i];
                    fallingDiagonal += finalColumnList[j][numColumns - 1 - i - j];
                }
                setNewValidWords((prev) => [...prev, ...wordsIn(risingDiagonal, "risingDiagonal", 0, i)]);
                setNewValidWords((prev) => [...prev, ...wordsIn(fallingDiagonal, "fallingDiagonal", 0, numColumns - 1 - i)]);
            }

            for (let i = 1; i < numColumns - 1; i++) {
                let risingDiagonal = "";
                let fallingDiagonal = "";
                for (let j = 0; j < numColumns - i; j++) {
                    risingDiagonal += finalColumnList[j + i][j];
                    fallingDiagonal += finalColumnList[j + i][numColumns - 1 - j];
                }
                setNewValidWords((prev) => [...prev, ...wordsIn(risingDiagonal, "risingDiagonal", i, 0)]);
                setNewValidWords((prev) => [...prev, ...wordsIn(fallingDiagonal, "fallingDiagonal", i, numColumns - 1)]);
            }

            if (newWords.length > 0) {
                setNewValidWords(newWords);
                addValidWords(newWords);
            }
        }
    }, [finished]);

    useEffect(() => {
        if (finalColumnList.every((list) => list.length > 0) && newValidWords.length === 0) {
            setFinished(true);
        }
    }, [finalColumnList]);

    const ColumnList = [];
    if (ColumnList.length === 0) {
        for (let i = 0; i < numColumns; i++) {
            ColumnList.push(
                <SlotColumn newStartTime={startTime} handleFinishedCol={handleFinishedCol} numColumns={numColumns} colIndex={i} />
            );
        }
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
                        left: `${index % 2 === 0 ? 70 : 15}%`,
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
                    {!finished
                        ? ColumnList.map((column, r) => (
                              <div className="slot" key={r}>
                                  {column}
                              </div>
                          ))
                        : finalColumnList.map((column, r) => (
                              <div className="slot" key={r} style={{ width: `${100 / numColumns}%` }}>
                                  <div className="slot-container">
                                      {column.map((letter, c) => Letter(letter, c, {animation: getAnimations(r, c)}))}
                                  </div>
                              </div>
                          ))}
                </div>
            </div>
        </>
    );
};
