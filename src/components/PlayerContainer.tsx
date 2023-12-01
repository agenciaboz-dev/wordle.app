import React from "react"
import { Avatar, Box } from "@mui/material"
import { Player } from "../definitions/Player"
import BrightnessLowIcon from "@mui/icons-material/BrightnessLow"
import { Room } from "../definitions/Room"

interface PlayerContainerProps {
    player: Player
    room: Room
}

export const PlayerContainer: React.FC<PlayerContainerProps> = ({ player, room }) => {
    const host = player.id == room.host.id
    return (
        <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ alignItems: "center", gap: "0.5vw" }}>
                <Avatar src={player.avatar} />
                <Box>{player.name}</Box>
            </Box>
            {host && <BrightnessLowIcon color="warning" />}
        </Box>
    )
}
