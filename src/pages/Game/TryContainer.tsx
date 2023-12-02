import React from "react"
import { Box } from "@mui/material"
import { useArray } from "burgos-array"
import { Room } from "../../definitions/Room"
import { TaiTextField } from "../../components/TaiTextField"

interface TryContainerProps {
    word: string
    room: Room
}

export const TryContainer: React.FC<TryContainerProps> = ({ word, room }) => {
    const chars = !!word
        ? word.split("")
        : useArray()
              .newArray(room.difficulty)
              .map((item) => "")

    const correct_chars = room.game!.word.split("")

    const including = chars.map((char) => correct_chars.includes(char))
    const matching = chars.map((char, index) => char == correct_chars[index])

    return (
        <Box sx={{ gap: "5vw" }}>
            {chars.map((char, index) => (
                <TaiTextField
                    key={index + char}
                    value={char.toUpperCase()}
                    InputProps={{
                        sx: {
                            fontWeight: "bold",
                            bgcolor: matching[index] ? "success.main" : including[index] ? "warning.main" : "#f1f1f1"
                        }
                    }}
                    disabled
                />
            ))}
        </Box>
    )
}
