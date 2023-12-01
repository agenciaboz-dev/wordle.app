import React from "react"
import { Box } from "@mui/material"
import { Room } from "../../definitions/Room"

interface PlayersListProps {
    room: Room
}

export const PlayersList: React.FC<PlayersListProps> = ({ room }) => {
    return <Box sx={{ width: "100%", height: "25%" }}></Box>
}
