import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { Logo } from "../components/Logo"
import { RoomsList } from "../components/RoomsList"
import { AvatarChooser } from "../components/AvatarChooser"
import { NewRoom } from "../components/NewRoom"
import { Fullscreen } from "../components/Fullscreen"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box
            sx={{
                position: "relative",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                alignItems: "center",
                gap: isMobile ? "5vw" : "2vw",
                padding: isMobile ? "10vw" : "3vw"
            }}>
            <Fullscreen />
            <Logo />
            <AvatarChooser />
            <RoomsList />
            <NewRoom />
        </Box>
    )
}
