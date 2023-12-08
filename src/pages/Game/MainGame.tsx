import React, { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import { Room } from "../../definitions/Room"
import { Player } from "../../definitions/Player"
import { TriesList } from "./TriesList"
import { InputContainer } from "./InputContainer"
import { useIo } from "../../hooks/useIo"
import { useRoom } from "../../hooks/useRoom"
import { PlayersDrawer } from "../../components/PlayersDrawer"
import { useSnackbar } from "burgos-snackbar"
import { HelpDrawer } from "../../components/HelpDrawer"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { usePlayer } from "../../hooks/usePlayer"

interface MainGameProps {
    room: Room
    player: Player
}

export const MainGame: React.FC<MainGameProps> = ({ room, player }) => {
    const host = room.host.id == player.id
    const io = useIo()
    const storage = useLocalStorage()

    const { setDrawer } = useRoom()
    const { setHelpDrawer } = usePlayer()
    const { snackbar } = useSnackbar()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key
            if (key === "Escape") setDrawer(true)
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    useEffect(() => {
        if (!storage.get("bozletrando:tutorial")) {
            setHelpDrawer(true)
            storage.set("bozletrando:tutorial", true)
        }

        io.on("game:ready", () => {
            setDrawer(false)
        })

        io.on("player:win", (player: Player) => {
            snackbar({ severity: "info", text: `${player.name} acertou!` })
        })

        io.on("player:lose", (player: Player) => {
            snackbar({ severity: "info", text: `${player.name} já molecou hehehe` })
        })

        return () => {
            io.off("game:ready")
            io.off("player:win")
            io.off("player:lose")
        }
    }, [])

    return (
        <Box sx={{ width: "100%", height: "75%", flexDirection: "column", gap: "3vw" }}>
            <TriesList room={room} player={player} />
            <InputContainer room={room} player={player} />
            <PlayersDrawer room={room} player={player} />
            <HelpDrawer />
        </Box>
    )
}
