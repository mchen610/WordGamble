export const Letter = (letter: string, index: number) => {
    return (
        <img
            src={"images/letters/" + letter + ".svg"}
            alt={"images/letters/" + letter + ".svg"}
            key={`${letter}${index}`}
        />
    );
};

export const Word = (word: string) => {
    return word.split("").map((letter, index) => (
        Letter(letter, index)
    ));
};
