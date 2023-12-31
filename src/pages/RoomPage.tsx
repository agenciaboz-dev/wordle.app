import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Paper, Slider, useMediaQuery } from "@mui/material"
import { Room } from "../definitions/Room"
import { Logo } from "../components/Logo"
import { Player } from "../definitions/Player"
import { TaiTextField } from "../components/TaiTextField"
import { useFormik } from "formik"
import { PlayerContainer } from "../components/PlayerContainer"
import { useIo } from "../hooks/useIo"
import { usePlayer } from "../hooks/usePlayer"
import { useRoom } from "../hooks/useRoom"
import { useNavigate } from "react-router-dom"
import { useArray } from "burgos-array"

interface RoomPageProps {
    room: Room
    player: Player
}

export const RoomPage: React.FC<RoomPageProps> = ({ room, player }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const host = player.id == room.host.id
    const io = useIo()
    const navigate = useNavigate()
    const marks = useArray().newArray(6)

    const { setPlayer } = usePlayer()
    const { setRoom } = useRoom()

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: { name: room.name, password: room.password, difficulty: room.difficulty },
        onSubmit: (values) => console.log(values),
        enableReinitialize: true
    })

    const onLeave = () => {
        io.emit("room:leave", { player_id: player.id, room_id: room.id })
    }

    const handleStart = () => {
        if (loading) return

        setLoading(true)
        io.emit("game:start")
    }

    useEffect(() => {
        if (host) io.emit("room:update", { ...formik.values, id: room.id })
    }, [formik.values])


    return (
        <Box
            sx={{
                flexDirection: "column",
                padding: isMobile ? "10vw" : "3vw",
                gap: isMobile ? "5vw" : "2vw",
                width: "100%",
                alignItems: isMobile ? "flex-start" : "center"
            }}>
            <Logo />
            <Box sx={{ flexDirection: "column", gap: isMobile ? "5vw" : "2vw", width: isMobile ? "100%" : "25vw" }}>
                <Paper
                    sx={{
                        flexDirection: "column",
                        borderRadius: isMobile ? "0 10vw" : "0 3vw",
                        color: "secondary.main",
                        padding: isMobile ? "5vw" : "2vw",
                        width: "100%"
                    }}>
                    <Box sx={{ fontWeight: "bold" }}>configurações</Box>
                </Paper>
                <Box sx={{ gap: isMobile ? "5vw" : "1vw" }}>
                    <TaiTextField label="nome" value={formik.values.name} name="name" onChange={formik.handleChange} disabled={!host} fullWidth />
                    <TaiTextField
                        label="senha"
                        value={formik.values.password}
                        name="password"
                        onChange={formik.handleChange}
                        disabled={!host}
                        type="password"
                        fullWidth
                    />
                </Box>
                <Box sx={{ flexDirection: "column", gap: "0", color: "primary.main", fontWeight: "bold" }}>
                    Dificuldade
                    <Slider
                        disabled={!host}
                        value={formik.values.difficulty}
                        name="difficulty"
                        onChange={formik.handleChange}
                        min={5}
                        max={10}
                        valueLabelDisplay="auto"
                        marks={marks.map((index) => ({ value: 10 - 6 + index, label: 10 - 6 + index }))}
                    />
                </Box>
            </Box>
            <Paper
                sx={{
                    flexDirection: "column",
                    borderRadius: isMobile ? "0 10vw" : "0 3vw",
                    color: "secondary.main",
                    padding: isMobile ? "5vw" : "2vw",
                    width: isMobile ? "100%" : "25vw",
                    gap: isMobile ? "3vw" : "1vw",
                    maxHeight: isMobile ? "70vw" : "5vw",
                    overflowY: "auto"
                }}>
                <Box sx={{ fontWeight: "bold" }}>jogadores ({room.players.length})</Box>
                {room.players.map((player) => (
                    <PlayerContainer key={player.id} player={player} room={room} />
                ))}
            </Paper>
            <Button
                variant="contained"
                sx={{ borderRadius: "0 5vw", color: "secondary.main", fontWeight: "bold", width: isMobile ? "100%" : "25vw" }}
                onClick={handleStart}
                disabled={!host}>
                {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "começar"}
            </Button>
            <Button variant="outlined" sx={{ borderRadius: "0 5vw", fontWeight: "bold", width: isMobile ? "100%" : "25vw" }} onClick={onLeave}>
                sair
            </Button>
        </Box>
    )
}
