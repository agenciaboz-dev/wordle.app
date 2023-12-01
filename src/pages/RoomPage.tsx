import React from "react"
import { Box, Paper } from "@mui/material"
import { Room } from "../definitions/Room"
import { Logo } from "../components/Logo"
import { Player } from "../definitions/Player"
import { TaiTextField } from "../components/TaiTextField"
import { useFormik } from "formik"
import { PlayerContainer } from "../components/PlayerContainer"

interface RoomPageProps {
    room: Room
    player: Player
}

export const RoomPage: React.FC<RoomPageProps> = ({ room, player }) => {
    const host = player.id == room.host.id

    const formik = useFormik({
        initialValues: { name: room.name, password: room.password },
        onSubmit: (values) => console.log(values),
        enableReinitialize: true
    })

    return (
        <Box sx={{ flexDirection: "column", padding: "2vw", gap: "2vw", width: "100%" }}>
            <Logo />
            <Paper sx={{ flexDirection: "column", borderRadius: "0 2vw", color: "secondary.main", padding: "1vw", width: "100%" }}>
                <Box sx={{ fontWeight: "bold" }}>configurações</Box>
            </Paper>
            <Box sx={{ gap: "1vw" }}>
                <TaiTextField label="" value={formik.values.name} name="name" onChange={formik.handleChange} disabled={!host} />
                <TaiTextField
                    label=""
                    value={formik.values.password}
                    name="password"
                    onChange={formik.handleChange}
                    disabled={!host}
                    type="password"
                />
            </Box>
            <Paper sx={{ flexDirection: "column", borderRadius: "0 2vw", color: "secondary.main", padding: "1vw", width: "100%", gap: "0.5vw" }}>
                <Box sx={{ fontWeight: "bold" }}>jogadores</Box>
                {room.players.map((player) => (
                    <PlayerContainer key={player.id} player={player} host={host} />
                ))}
            </Paper>
        </Box>
    )
}
