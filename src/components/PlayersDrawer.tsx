import React from "react"
import { Box, Drawer } from "@mui/material"
import { Room } from "../definitions/Room"
import { useRoom } from "../hooks/useRoom"

interface PlayersDrawerProps {
    room: Room
}

export const PlayersDrawer: React.FC<PlayersDrawerProps> = ({ room }) => {
    const { drawer: open, setDrawer } = useRoom()

    return (
        <Drawer
            anchor={"bottom"}
            open={open}
            onClose={() => setDrawer(false)}
            PaperProps={{ sx: { width: "100vw", height: "60vh", bgcolor: "background.default" } }}>
            {room.players.map((player) => (
                <Box key={player.id}>{player.name}</Box>
            ))}
        </Drawer>
    )
}
