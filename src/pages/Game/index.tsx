import React, { useState } from "react"
import { Box } from "@mui/material"
import { Room } from "../../definitions/Room"
import { Player } from "../../definitions/Player"
import { Header } from "./Header"
import { MainGame } from "./MainGame"
import { PlayersList } from "./PlayersList"

interface GameProps {
    room: Room
    player: Player
}

export const Game: React.FC<GameProps> = ({ room, player }) => {
    const [headerHeight, setHeaderHeight] = useState(0)

    return (
        <Box sx={{ flexDirection: "column", color: "primary.main", width: "100%" }}>
            <Header room={room} setHeaderHeight={setHeaderHeight} />
            <Box sx={{ flexDirection: "column", width: "100%", height: window.innerHeight - headerHeight }}>
                <MainGame room={room} player={player} />
                <PlayersList room={room} />
            </Box>
        </Box>
    )
}
