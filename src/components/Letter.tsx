import React from "react"
import { Box, Button } from "@mui/material"

interface LetterProps {
    letter: string
    onLetterClick: (letter: string) => void
    matching?: boolean
    exists?: boolean
}

export const Letter: React.FC<LetterProps> = ({ letter, onLetterClick, matching, exists }) => {
    return (
        <Button
            // variant={!matching && !exists ? "text" : "outlined"}
            variant="outlined"
            color={matching ? "success" : exists ? "warning" : "primary"}
            sx={{ minWidth: 0, fontSize: "1rem", fontWeight: "bold" }}
            onClick={() => onLetterClick(letter)}>
            {letter}
        </Button>
    )
}
