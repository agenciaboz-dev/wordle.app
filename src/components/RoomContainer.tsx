import React from "react"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { Room } from "../definitions/Room"
import ReplyIcon from "@mui/icons-material/Reply"
import { useAvatar } from "../hooks/useAvatar"
import { useIo } from "../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { Star } from "@mui/icons-material"
import { getDifficultyColor } from "../tools/get_difficulty_color"

interface RoomContainerProps {
    room: Room
}

export const RoomContainer: React.FC<RoomContainerProps> = ({ room }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const avatar = useAvatar()
    const io = useIo()

    const { snackbar } = useSnackbar()

    const handleJoin = () => {
        if (!avatar.name) {
            snackbar({ severity: "error", text: "digite um apelido" })
            return
        }

        const data: { player: NewPlayer; room_id: string } = {
            player: avatar,
            room_id: room.id
        }

        io.emit("room:join", data)
    }

    return (
        <Box sx={{ width: "100%", color: "secondary.main", alignItems: "center", gap: isMobile ? "1vw" : "0.5vw" }}>
            <Box sx={{ flexDirection: "column", flex: 1, gap: "0.2vw", fontSize: isMobile ? "5vw" : "1vw", fontWeight: "bold" }}>
                <Box sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    {room.name}
                    <Box sx={{ alignItems: "center", gap: "1vw", color: `${getDifficultyColor(room.difficulty)}.main`, fontSize: "5vw" }}>
                        <Star sx={{ width: "5vw" }} />
                        {room.difficulty}
                    </Box>
                </Box>
                <Box
                    sx={{
                        fontSize: isMobile ? "3vw" : "0.7vw",
                        borderTop: "1px solid white",
                        paddingTop: "0.2vw",
                        justifyContent: "space-between",
                        fontWeight: "normal"
                    }}>
                    {room.host.name}
                    <Box>{new Date(room.created_at).toLocaleTimeString("pt-br")}</Box>
                </Box>
            </Box>
            <IconButton color="secondary" onClick={handleJoin}>
                <ReplyIcon sx={{ width: isMobile ? "7vw" : "2vw", height: isMobile ? "7vw" : "2vw" }} />
            </IconButton>
        </Box>
    )
}
