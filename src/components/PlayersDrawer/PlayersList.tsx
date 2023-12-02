import React from "react"
import { Box } from "@mui/material"
import { Player } from "../../definitions/Player"
import { PlayerContainer } from "./PlayerContainer"

interface PlayersListProps {
    players: Player[]
}

export const PlayersList: React.FC<PlayersListProps> = ({ players }) => {
    return (
        <Box sx={{ flexDirection: "column" }}>
            {players
                .sort((a, b) => b.score - a.score)
                .map((player) => (
                    <PlayerContainer key={player.id} player={player} />
                ))}
        </Box>
    )
}
