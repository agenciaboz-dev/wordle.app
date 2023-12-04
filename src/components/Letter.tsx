import React from "react"
import { Box, Button, Grid } from "@mui/material"

interface LetterProps {
    letter: string
    onLetterClick: (letter: string) => void
    matching?: boolean
    exists?: boolean
    not_present?: boolean
}

export const Letter: React.FC<LetterProps> = ({ letter, onLetterClick, matching, exists, not_present }) => {
    return (
        <Grid item xs={1}>
            <Button
                // variant={!matching && !exists ? "text" : "outlined"}
                variant="outlined"
                color={matching ? "success" : exists ? "warning" : "primary"}
                sx={{ minWidth: 0, fontSize: "1rem", fontWeight: "bold", padding: "1vw 2vw" }}
                fullWidth
                disabled={not_present}
                onClick={() => onLetterClick(letter)}>
                {letter}
            </Button>
        </Grid>
    )
}
