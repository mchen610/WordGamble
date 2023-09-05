import { useState, useEffect } from "react";
import { SlotColumn } from "./SlotColumn";
import wordList from "./words.json";
import { Letter, Word } from "./Word";

const colors = ["red", "blue", "yellow", "orange", "purple"];

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

    const [wordCount, setWordCount] = useState(0);

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
                let color = colors[realWords.length % colors.length];

                console.log(words[i]);
                realWords.push(words[i]);
                setWordCount((prevWordCount) => prevWordCount + 1);
                
                setColumnStyleList((columnList) => {
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

                        columnList[newRow][newCol] = {
                            transitionDelay: `${wordCount-1}s`,
                            filter: `${columnList[newRow][newCol].filter}drop-shadow(0 0 3px ${color}) `,
                        };
                    }

                    return columnList;
                });
            }
        }

        return realWords;
    };
    const [finalColumnList, setFinalColumnList] = useState<string[][]>(
        newEmptyLists(numColumns)
    );

    const [columnStyleList, setColumnStyleList] = useState<
        React.CSSProperties[][]
    >(() => {
        let newList: React.CSSProperties[][] = newEmptyLists(numColumns);
        for (let i = 0; i < numColumns; i++) {
            for (let j = 0; j < numColumns; j++) {
                newList[i].push({ transitionDelay: "", filter: "" });
            }
        }
        return newList;
    });

    const handleFinishedCol = (finalColumn: string[], colIndex: number) => {
        let newList = finalColumnList.slice();
        newList[colIndex] = finalColumn;
        setFinalColumnList(newList);
    };

    const [newValidWords, setNewValidWords] = useState<string[]>([]);

    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (finished === true) {
            let newWords: string[] = [];

            for (let i = 0; i < numColumns; i++) {
                let row = "";
                for (let j = 0; j < numColumns; j++) {
                    row += finalColumnList[j][i];
                }

                newWords = newWords.concat(wordsIn(row, "row", 0, i));

                let col = finalColumnList[i].join("");

                newWords = newWords.concat(wordsIn(col, "col", i, 0));
            }

            for (let i = 0; i < numColumns - 1; i++) {
                let risingDiagonal = "";
                let fallingDiagonal = "";
                for (let j = 0; j < numColumns - i; j++) {
                    risingDiagonal += finalColumnList[j][j + i];
                    fallingDiagonal +=
                        finalColumnList[j][numColumns - 1 - i - j];
                }
                console.log(risingDiagonal, fallingDiagonal);
                newWords = newWords.concat(
                    wordsIn(risingDiagonal, "risingDiagonal", 0, i)
                );
                newWords = newWords.concat(
                    wordsIn(
                        fallingDiagonal,
                        "fallingDiagonal",
                        0,
                        numColumns - 1 - i
                    )
                );
            }

            for (let i = 1; i < numColumns - 1; i++) {
                let risingDiagonal = "";
                let fallingDiagonal = "";
                for (let j = 0; j < numColumns - i; j++) {
                    risingDiagonal += finalColumnList[j + i][j];
                    fallingDiagonal +=
                        finalColumnList[j + i][numColumns - 1 - j];
                }
                console.log(risingDiagonal, fallingDiagonal);
                newWords = newWords.concat(
                    wordsIn(risingDiagonal, "risingDiagonal", i, 0)
                );
                newWords = newWords.concat(
                    wordsIn(
                        fallingDiagonal,
                        "fallingDiagonal",
                        i,
                        numColumns - 1
                    )
                );
            }

            if (newWords.length > 0) {
                setNewValidWords(newWords);
                addValidWords(newWords);
            }
        }
    }, [finished]);

    useEffect(() => {
        if (
            finalColumnList.every((list) => list.length > 0) &&
            newValidWords.length === 0
        ) {
            setFinished(true);
        }
    }, [finalColumnList]);

    const ColumnList = [];
    if (ColumnList.length === 0) {
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
                        ? ColumnList.map((column, index) => (
                              <div className="slot" key={index}>
                                  {column}
                              </div>
                          ))
                        : finalColumnList.map((column, rowIndex) => (
                              <div
                                  className="slot"
                                  key={rowIndex}
                                  style={{ width: `${100 / numColumns}%` }}
                              >
                                  <div className="slot-container">
                                      {column.map((letter, colIndex) =>
                                          Letter(
                                              letter,
                                              colIndex,
                                              columnStyleList[rowIndex][
                                                  colIndex
                                              ]
                                          )
                                      )}
                                  </div>
                              </div>
                          ))}
                </div>
            </div>
        </>
    );
};
