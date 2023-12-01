import React, { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import { Room } from "../../definitions/Room"
import { Player } from "../../definitions/Player"
import { TriesList } from "./TriesList"
import { InputContainer } from "./InputContainer"
import { useIo } from "../../hooks/useIo"

interface MainGameProps {
    room: Room
    player: Player
}

export const MainGame: React.FC<MainGameProps> = ({ room, player }) => {
    const host = room.host.id == player.id
    const io = useIo()

    const [ready, setReady] = useState(false)

    const handleClick = () => {
        io.emit("game:next_round")
    }

    useEffect(() => {
        io.on("game:ready", () => {
            setReady(true)
        })

        io.on("game:next_round", () => {
            setReady(false)
        })

        return () => {
            io.off("game:ready")
            io.off("game:next_round")
        }
    }, [])

    return (
        <Box sx={{ width: "100%", height: "75%", padding: "5vw", flexDirection: "column", gap: "10vw" }}>
            <TriesList room={room} player={player} />
            <InputContainer room={room} player={player} />
            <Button variant="contained" sx={{ borderRadius: "0 5vw", color: "secondary.main" }} disabled={!ready || !host} onClick={handleClick}>
                próximo
            </Button>
        </Box>
    )
}
