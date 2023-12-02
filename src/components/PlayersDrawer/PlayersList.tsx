import React from "react"
import { Box } from "@mui/material"
import { Player } from "../../definitions/Player"
import { PlayerContainer } from "./PlayerContainer"

interface PlayersListProps {
    players: Player[]
    player: Player
}

export const PlayersList: React.FC<PlayersListProps> = ({ players, player }) => {
    return (
        <Box sx={{ flexDirection: "column", gap: "2vw", width: "100%", maxHeight: "70vh", overflowY: "auto" }}>
            <Box sx={{ borderBottom: "1px solid", fontWeight: "bold", width: "100%", paddingBottom: "2vw" }}>
                <PlayerContainer player={player} />
            </Box>
            {players
                .sort((a, b) => b.score - a.score)
                .map((player) => (
                    <PlayerContainer key={player.id} player={player} />
                ))}
        </Box>
    )
}
