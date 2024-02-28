import React from "react"
import { Box } from "@mui/material"
import { Player } from "../../definitions/Player"
import { Room } from "../../definitions/Room"
import { useArray } from "burgos-array"
import { TryContainer } from "./TryContainer"

interface TriesListProps {
    room: Room
    player: Player
}

export const TriesList: React.FC<TriesListProps> = ({ room, player }) => {
    const available = room.attempts - player.history.length
    const tries = useArray().newArray(available)

    return (
        <Box sx={{ flexDirection: "column", width: "100%", gap: "2vw", padding: "5vw 5vw 0 5vw" }}>
            {player.history.map((attempt, index) => (
                <TryContainer key={index + attempt} word={attempt} room={room} />
            ))}
            {tries.map((_, index) => (
                <TryContainer key={player.history.length + index} word="" room={room} />
            ))}
        </Box>
    )
}
