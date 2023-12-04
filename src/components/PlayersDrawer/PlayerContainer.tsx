import React from "react"
import { Avatar, Box } from "@mui/material"
import { Player } from "../../definitions/Player"
import { Star } from "@mui/icons-material"
import { Room } from "../../definitions/Room"
import { LastAttempt } from "./LastAttempt"

interface PlayerContainerProps {
    player: Player
    room?: Room
}

export const PlayerContainer: React.FC<PlayerContainerProps> = ({ player, room }) => {
    return (
        <Box sx={{ flexDirection: "column", width: "100%", gap: "2vw", alignItems: "center" }}>
            <Box sx={{ color: "primary.main", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <Box sx={{ alignItems: "center", gap: "3vw" }}>
                    <Avatar src={player.avatar} sx={{ width: "10vw", height: "10vw", bgcolor: "primary.main", color: "secondary.main" }} />
                    {player.name}
                </Box>
                <Box sx={{ alignItems: "center", gap: "1vw" }}>
                    <Star />
                    {player.score}
                </Box>
            </Box>

            {room && <LastAttempt player={player} room={room} />}
        </Box>
    )
}
