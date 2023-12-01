import { createContext, useState } from "react"
import React from "react"
import { Room } from "../definitions/Room"

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
    const [room, setRoom] = useState<Room | null>(null)

    return <RoomContext.Provider value={{ room, setRoom }}>{children}</RoomContext.Provider>
}
