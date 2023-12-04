import React from "react"
import { Box } from "@mui/material"
import { Player } from "../../definitions/Player"
import { PlayerContainer } from "./PlayerContainer"
import { Room } from "../../definitions/Room"

interface PlayersListProps {
    players: Player[]
    player: Player
    room: Room
}

export const PlayersList: React.FC<PlayersListProps> = ({ players, player, room }) => {
    return (
        <Box sx={{ flexDirection: "column", gap: "2vw", width: "100%", maxHeight: "70vh", overflowY: "auto" }}>
            <Box sx={{ borderBottom: "1px solid", fontWeight: "bold", width: "100%", paddingBottom: "2vw" }}>
                <PlayerContainer player={player} />
            </Box>
            {players
                .sort((a, b) => b.score - a.score)
                .map((player) => (
                    <PlayerContainer key={player.id} player={player} room={room} />
                ))}
        </Box>
    )
}
