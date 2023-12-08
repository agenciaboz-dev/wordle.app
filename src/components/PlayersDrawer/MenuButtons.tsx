import React from "react"
import { Box, Button, IconButton } from "@mui/material"
import { Player } from "../../definitions/Player"
import { Room } from "../../definitions/Room"
import { useIo } from "../../hooks/useIo"
import { ExitToApp, Help, History } from "@mui/icons-material"
import { MenuButton } from "./MenuButton"

interface MenusButtonsProps {
    player: Player
    room: Room
}

export const MenusButtons: React.FC<MenusButtonsProps> = ({ player, room }) => {
    const io = useIo()

    const handleBackToRoom = () => {
        io.emit("game:stop")
    }

    const handleLeaveRoom = () => {
        io.emit("room:leave", { player_id: player.id, room_id: room.id })
    }

    return (
        <Box sx={{ marginTop: "auto", width: "100%", justifyContent: "space-between" }}>
            <MenuButton icon={<History sx={{ width: "7vw", height: "7vw" }} />} onClick={() => {}} />
            <MenuButton icon={<Help sx={{ width: "7vw", height: "7vw" }} />} onClick={() => {}} />
            <MenuButton
                icon={<ExitToApp sx={{ width: "7vw", height: "7vw" }} />}
                onClick={player.id == room.host.id ? handleBackToRoom : handleLeaveRoom}
            />
        </Box>
    )
}
