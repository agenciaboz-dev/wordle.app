import React from "react"
import { Box, Button } from "@mui/material"

interface LetterProps {
    letter: string
    onLetterClick: (letter: string) => void
}

export const Letter: React.FC<LetterProps> = ({ letter, onLetterClick }) => {
    return (
        <Button variant="text" sx={{ minWidth: 0 }} onClick={() => onLetterClick(letter)}>
            {letter}
        </Button>
    )
}
