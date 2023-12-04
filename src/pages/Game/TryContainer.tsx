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

    const matching = chars.map((char, index) => char == correct_chars[index])

    return (
        <Box sx={{ gap: "2vw" }}>
            {chars.map((char, index) => {
                const count = !!char ? correct_chars.filter((item) => item == char).length : false

                return (
                    <TaiTextField
                        key={index + char}
                        value={char.toUpperCase()}
                        inputProps={{
                            style: {
                                padding: 0,
                                height: "10vw",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center"
                            }
                        }}
                        InputProps={{
                            sx: {
                                fontWeight: "bold",
                                bgcolor: matching[index] ? "success.main" : !!count ? "warning.main" : "#f1f1f1",
                                outline: "5px solid",
                                outlineColor: Number(count) < 2 ? "transparent" : "primary.main"
                            }
                        }}
                        disabled
                    />
                )
            })}
        </Box>
    )
}
