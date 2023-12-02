import React from "react"
import { Box } from "@mui/material"
import { Player } from "../../definitions/Player"
import { Star } from "@mui/icons-material"

interface PlayerContainerProps {
    player: Player
}

export const PlayerContainer: React.FC<PlayerContainerProps> = ({ player }) => {
    return (
        <Box sx={{ color: "primary.main", alignItems: "center", justifyContent: "space-between" }}>
            {player.name}
            <Box sx={{ alignItems: "center", gap: "1vw" }}>
                <Star />
                {player.score}
            </Box>
        </Box>
    )
}
