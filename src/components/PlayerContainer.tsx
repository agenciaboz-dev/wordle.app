import React from "react"
import { Avatar, Box, useMediaQuery } from "@mui/material"
import { Player } from "../definitions/Player"
import BrightnessLowIcon from "@mui/icons-material/BrightnessLow"
import { Room } from "../definitions/Room"
import { usePlayer } from "../hooks/usePlayer"

interface PlayerContainerProps {
    player: Player
    room: Room
}

export const PlayerContainer: React.FC<PlayerContainerProps> = ({ player, room }) => {
    const { player: current_player } = usePlayer()

    const host = player.id == room.host.id
    const you = current_player?.id == player.id

    const isMobile = useMediaQuery("(orientation: portrait)")

    const AVATAR_SIZE = isMobile ? "10vw" : "3vw"

    return (
        <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ alignItems: "center", gap: isMobile ? "2vw" : "1vw" }}>
                <Avatar src={player.avatar} sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, bgcolor: "secondary.main", color: "primary.main" }} />
                <Box sx={{ fontSize: isMobile ? "5vw" : "1vw", fontWeight: you ? "bold" : "" }}>{player.name}</Box>
            </Box>
            {host && <BrightnessLowIcon color="warning" sx={{ width: isMobile ? "8vw" : "2vw", height: isMobile ? "8vw" : "2vw" }} />}
        </Box>
    )
}
