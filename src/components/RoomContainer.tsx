import React, { useEffect } from "react"
import { Box, IconButton } from "@mui/material"
import { Room } from "../definitions/Room"
import ReplyIcon from "@mui/icons-material/Reply"
import { useAvatar } from "../hooks/useAvatar"
import { useIo } from "../hooks/useIo"

interface RoomContainerProps {
    room: Room
}

export const RoomContainer: React.FC<RoomContainerProps> = ({ room }) => {
    const avatar = useAvatar()
    const io = useIo()

    useEffect(() => {}, [])

    return (
        <Box sx={{ width: "100%", color: "secondary.main", alignItems: "center" }}>
            <Box sx={{ flexDirection: "column", flex: 1, gap: "0.2vw" }}>
                {room.name}
                <Box sx={{ fontSize: "0.6rem", borderTop: "1px solid white", paddingTop: "0.2vw", justifyContent: "space-between" }}>
                    {room.host.name}
                    <Box>{new Date(room.created_at).toLocaleTimeString("pt-br")}</Box>
                </Box>
            </Box>
            <IconButton color="secondary">
                <ReplyIcon />
            </IconButton>
        </Box>
    )
}
