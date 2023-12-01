import React, { useEffect, useState } from "react"
import { Box, Paper, useMediaQuery } from "@mui/material"
import { useIo } from "../hooks/useIo"
import { Room } from "../definitions/Room"
import { RoomContainer } from "./RoomContainer"

interface RoomsListProps {}

export const RoomsList: React.FC<RoomsListProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
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

        io.on("room:list:update", (room: Room) => {
            setRooms((previous) => [...previous.filter((item) => item.id != room.id), room])
        })

        return () => {
            io.off("room:list")
            io.off("room:new")
            io.off("room:remove")
            io.off("room:list:update")
        }
    }, [])

    return (
        <Paper
            sx={{
                width: isMobile ? "100%" : "20vw",
                padding: isMobile ? "0 5vw" : "0 2vw",
                borderRadius: isMobile ? "0 10vw" : "0 3vw",
                flexDirection: "column",
                gap: isMobile ? "5vw" : "2vw"
            }}>
            <Box
                sx={{
                    flexDirection: "column",
                    maxHeight: isMobile ? "45vw" : "5vw",
                    overflowY: "auto",
                    gap: "2vw",
                    padding: isMobile ? "5vw 0" : "1vw 0"
                }}>
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
