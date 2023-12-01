import React from "react"
import { Box } from "@mui/material"
import { Room } from "../../definitions/Room"
import { Player } from "../../definitions/Player"
import { TriesList } from "./TriesList"
import { InputContainer } from "./InputContainer"

interface MainGameProps {
    room: Room
    player: Player
}

export const MainGame: React.FC<MainGameProps> = ({ room, player }) => {
    return (
        <Box sx={{ width: "100%", height: "75%", padding: "5vw", flexDirection: "column", gap: "10vw" }}>
            <TriesList room={room} player={player} />
            <InputContainer room={room} player={player} />
        </Box>
    )
}
