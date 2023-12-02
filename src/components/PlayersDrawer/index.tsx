import React from "react"
import { Box, Drawer } from "@mui/material"
import { useRoom } from "../../hooks/useRoom"
import { Room } from "../../definitions/Room"
import { Player } from "../../definitions/Player"
import { PlayersList } from "./PlayersList"
import { backdropStyle } from "../../style/backdrop"

interface PlayersDrawerProps {
    room: Room
    player: Player
}

export const PlayersDrawer: React.FC<PlayersDrawerProps> = ({ room, player }) => {
    const { drawer: open, setDrawer } = useRoom()

    return (
        <Drawer
            anchor={"bottom"}
            open={open}
            onClose={() => setDrawer(false)}
            // slotProps={{ backdrop: { sx: backdropStyle } }}
            PaperProps={{ elevation: 5, sx: { width: "100vw", height: "60vh", bgcolor: "background.default", borderRadius: "10vw 10vw 0 0" } }}>
            <Box sx={{ flexDirection: "column", gap: "5vw", padding: "10vw" }}>
                <PlayersList players={room.players.filter((item) => item != player)} />
            </Box>
        </Drawer>
    )
}
