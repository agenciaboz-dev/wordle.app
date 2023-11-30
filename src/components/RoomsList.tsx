import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { useIo } from "../hooks/useIo"
import { Room } from "../definitions/Room"

interface RoomsListProps {}

export const RoomsList: React.FC<RoomsListProps> = ({}) => {
    const io = useIo()

    const [rooms, setRooms] = useState<Room[]>([])

    useEffect(() => {
        io.emit("room:list")
        console.log('oi')

        io.on("room:list", (data) => {
            console.log(data)
            setRooms(data)
        })

        io.on('room:new', (room: Room) => {
            setRooms(previous => [...previous.filter(item => item.id != room.id), room])
        })

        io.on('room:remove', (room: Room) => {
            setRooms(previous => previous.filter(item => item.id != room.id))
        })

        return () => {
            io.off("room:list")
            io.off("room:new")
            io.off("room:remove")
        }
    }, [])

    return (
        <Box sx={{}}>
            <Box sx={{ flexDirection: "column" }}>
                {rooms.map((room) => (
                    <Box key={room.id}>{room.name}</Box>
                ))}
            </Box>
        </Box>
    )
}
