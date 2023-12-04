import React from "react"
import { Box } from "@mui/material"
import { Player } from "../../definitions/Player"
import { Room } from "../../definitions/Room"
import { Star } from "@mui/icons-material"

interface WordContainerProps {
    player: Player
    room: Room
}

export const WordContainer: React.FC<WordContainerProps> = ({ player, room }) => {
    return player.ready ? (
        <Box
            sx={{
                alignSelf: "center",
                fontWeight: "bold",
                color: player.history[player.history.length - 1] == room.game?.word ? "success.main" : "error.main",
                alignItems: "center",
                gap: "2vw"
            }}>
            <Star />
            {room.game?.word.toUpperCase()}
            <Star />
        </Box>
    ) : null
}
