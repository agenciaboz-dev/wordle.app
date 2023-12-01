import { createContext, useEffect, useState } from "react"
import React from "react"
import { Room } from "../definitions/Room"
import { useIo } from "../hooks/useIo"
import { usePlayer } from "../hooks/usePlayer"
import { useNavigate } from "react-router-dom"

interface RoomContextValue {
    room: Room | null
    setRoom: React.Dispatch<React.SetStateAction<Room | null>>
}

interface RoomProviderProps {
    children: React.ReactNode
}

const RoomContext = createContext<RoomContextValue>({} as RoomContextValue)

export default RoomContext

export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
    const io = useIo()
    const navigate = useNavigate()

    const { setPlayer } = usePlayer()

    const [room, setRoom] = useState<Room | null>(null)

    useEffect(() => {
        io.on("room:join", (data) => {
            setRoom(data.room)
            setPlayer(data.player)
            navigate("/room")
        })

        io.on("room:update", (room) => setRoom(room))

        return () => {
            io.off("room:join")
            io.off("room:update")
        }
    }, [])

    return <RoomContext.Provider value={{ room, setRoom }}>{children}</RoomContext.Provider>
}
