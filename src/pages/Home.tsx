import React from 'react'
import { Box, useMediaQuery } from "@mui/material"
import { Logo } from "../components/Logo"
import { RoomsList } from "../components/RoomsList"
import { AvatarChooser } from "../components/AvatarChooser"
import { NewRoom } from "../components/NewRoom"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                flexDirection: "column",
                width: "100%",
                height: "100%",
                alignItems: "center",
                gap: isMobile ? "5vw" : "2vw",
                padding: isMobile ? "10vw" : "3vw"
            }}>
            <Logo />
            <AvatarChooser />
            <RoomsList />
            <NewRoom />
        </Box>
    )
}