import { createContext, useEffect, useState } from "react"
import React from "react"
import { Room } from "../definitions/Room"
import { useIo } from "../hooks/useIo"
import { usePlayer } from "../hooks/usePlayer"
import { useNavigate } from "react-router-dom"

interface RoomContextValue {
    room: Room | null
    setRoom: React.Dispatch<React.SetStateAction<Room | null>>

    drawer: boolean
    setDrawer: React.Dispatch<React.SetStateAction<boolean>>

    historyDrawer: boolean
    setHistoryDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

interface RoomProviderProps {
    children: React.ReactNode
}

const RoomContext = createContext<RoomContextValue>({} as RoomContextValue)

export default RoomContext

export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
    const io = useIo()
    const navigate = useNavigate()

    const { player, setPlayer } = usePlayer()

    const [room, setRoom] = useState<Room | null>(null)
    const [drawer, setDrawer] = useState(false)
    const [historyDrawer, setHistoryDrawer] = useState(false)

    useEffect(() => {
        io.on("disconnect", (reason) => {
            // if (reason == "io client disconnect" || reason == "io server disconnect") {
            //     snackbar({ severity: "info", text: "Desconectado do servidor" })
            // } else {
            //     snackbar({ severity: "error", text: "Conexão com o servidor perdida! Tentando reconectar automaticamente" })
            // }

            setPlayer(null)
            setRoom(null)
            navigate("/")
        })

        return () => {
            io.off("disconnect")
        }
    }, [room, player])

    useEffect(() => {
        if (room?.game) console.log(room.game)
    }, [room?.game])

    useEffect(() => {
        io.on("room:update", (data: Room) => {
            // console.log(room)
            if (!room?.game && data.game) {
                navigate("/game")
            }

            setRoom(data)
            setPlayer(data.players.find((item) => item.id == player?.id) || null)
        })

        return () => {
            io.off("room:update")
        }
    }, [room])

    useEffect(() => {
        io.on("room:join", (data) => {
            setRoom(data.room)
            setPlayer(data.player)
            navigate("/room")
        })

        io.on("room:leave", () => {
            setPlayer(null)
            setRoom(null)
            navigate("/")
        })

        return () => {
            io.off("room:join")
            io.off("room:leave")
        }
    }, [])

    return <RoomContext.Provider value={{ room, setRoom, drawer, setDrawer, historyDrawer, setHistoryDrawer }}>{children}</RoomContext.Provider>
}
