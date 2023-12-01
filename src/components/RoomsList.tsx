import React, { useEffect, useState } from "react"
import { Box, Paper, Skeleton } from "@mui/material"
import { useIo } from "../hooks/useIo"
import { Room } from "../definitions/Room"
import { RoomContainer } from "./RoomContainer"

interface RoomsListProps {}

export const RoomsList: React.FC<RoomsListProps> = ({}) => {
    const io = useIo()

    const [rooms, setRooms] = useState<Room[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        io.emit("room:list")
        console.log("oi")

        io.on("room:list", (data) => {
            setRooms(data)
            setLoading(false)
        })

        io.on("room:new", (room: Room) => {
            console.log(room)
            setRooms((previous) => [...previous.filter((item) => item.id != room.id), room])
        })

        io.on("room:remove", (room: Room) => {
            setRooms((previous) => previous.filter((item) => item.id != room.id))
        })

        return () => {
            io.off("room:list")
            io.off("room:new")
            io.off("room:remove")
        }
    }, [])

    return (
        <Paper sx={{ width: "100%", padding: "2vw 1vw", borderRadius: "0 2vw", flexDirection: "column", gap: "1vw" }}>
            <Box sx={{ flexDirection: "column", maxHeight: "5vw", overflowY: "auto", gap: "0.5vw" }}>
                {rooms
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .map((room) => (
                        <RoomContainer key={room.id} room={room} />
                    ))}
                {!rooms.length && <Box sx={{ color: "secondary.main" }}>parece que não há nenhuma sala</Box>}
            </Box>
        </Paper>
    )
}
