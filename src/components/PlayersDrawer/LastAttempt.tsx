import React from "react"
import { Box } from "@mui/material"
import { Player } from "../../definitions/Player"
import { Room } from "../../definitions/Room"
import { useArray } from "burgos-array"

interface LastAttemptProps {
    player: Player
    room: Room
}

const SIZE = "5vw"

export const LastAttempt: React.FC<LastAttemptProps> = ({ player, room }) => {
    const chars = (room.game?.word || "").split("")
    const empty = useArray()
        .newArray(room.difficulty)
        .map(() => "")

    const attempt = !!player.history.length ? player.history[player.history.length - 1].split("") : empty

    return (
        <Box sx={{ gap: "2vw" }}>
            {player.history.length}
            {attempt.map((char, index) => {
                const includes = chars.includes(char)
                const matching = chars[index] == char

                return (
                    <Box
                        key={index + char}
                        sx={{
                            borderRadius: "0 2vw",
                            height: SIZE,
                            width: SIZE,
                            bgcolor: matching ? "success.main" : includes ? "warning.main" : "#f1f1f1"
                        }}
                    />
                )
            })}
        </Box>
    )
}
