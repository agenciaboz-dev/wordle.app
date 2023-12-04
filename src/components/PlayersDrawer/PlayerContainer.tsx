import React from "react"
import { Avatar, Box } from "@mui/material"
import { Player } from "../../definitions/Player"
import { Star } from "@mui/icons-material"

interface PlayerContainerProps {
    player: Player
}

export const PlayerContainer: React.FC<PlayerContainerProps> = ({ player }) => {
    return (
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
    )
}
