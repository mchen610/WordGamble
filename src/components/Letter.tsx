export const Letter = (letter: string, index: number) => {
    return (
        <img
            src={"images/letters/" + letter + ".svg"}
            alt={"images/letters/" + letter + ".svg"}
            key={letter+String(index)}
        />
    );
};

export const Word = (word: string) => {
    return word.split("").map((letter: string, index: number) => (
        Letter(letter, index)
    ));
};
