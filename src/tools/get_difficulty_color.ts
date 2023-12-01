export const getDifficultyColor = (difficulty: number) => {
    const easy = difficulty < 7
    const medium = difficulty >= 7 && difficulty <= 8
    const hard = difficulty > 8

    return easy ? "success" : medium ? "warning" : "error"
}
