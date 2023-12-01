import React from "react"
import { Box } from "@mui/material"
import { Player } from "../../definitions/Player"
import { Room } from "../../definitions/Room"

interface PlayerContainerProps {
    room: Room
    player: Player
}

export const PlayerContainer: React.FC<PlayerContainerProps> = ({ room, player }) => {
    return <Box sx={{}}></Box>
}
