import React, { useEffect } from "react"
import { Box, Button, useMediaQuery } from "@mui/material"
import { useAvatar } from "../hooks/useAvatar"
import { useIo } from "../hooks/useIo"
import { useFormik } from "formik"
import { TaiTextField } from "./TaiTextField"
import { useSnackbar } from "burgos-snackbar"
import { useNavigate } from "react-router-dom"
import { useRoom } from "../hooks/useRoom"
import { usePlayer } from "../hooks/usePlayer"

interface NewRoomProps {}

export const NewRoom: React.FC<NewRoomProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const avatar = useAvatar()
    const io = useIo()
    const navigate = useNavigate()

    const { snackbar } = useSnackbar()
    const { setRoom } = useRoom()
    const { setPlayer } = usePlayer()

    const formik = useFormik<NewRoom>({
        initialValues: { name: "", password: "" },
        onSubmit: (values) => {
            const data = { player: avatar, room: values }

            if (!data.player.name) {
                snackbar({ severity: "error", text: "digite um apelido" })
                return
            }

            if (!data.room.name) {
                snackbar({ severity: "error", text: "digite um nome para a sala" })
                return
            }

            io.emit("room:new", data)
        }
    })

    useEffect(() => {
        io.on("room:new:success", (data) => {
            setRoom(data.room)
            setPlayer(data.player)
            navigate("/room")
        })
    }, [])

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box sx={{ width: isMobile ? "100%" : "20vw", gap: isMobile ? "5vw" : "1vw", flexDirection: "column" }}>
                <Box sx={{ gap: isMobile ? "5vw" : "1vw" }}>
                    <TaiTextField label="nome da sala" value={formik.values.name} name="name" onChange={formik.handleChange} autoComplete="off" />
                    <TaiTextField
                        label="senha"
                        value={formik.values.password}
                        name="password"
                        onChange={formik.handleChange}
                        type="password"
                        autoComplete="off"
                    />
                </Box>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ borderRadius: isMobile ? "0 5vw" : "0 1vw", color: "secondary.main", fontWeight: "bold" }}>
                    criar sala
                </Button>
            </Box>
        </form>
    )
}
