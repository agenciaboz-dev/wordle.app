import React from 'react'
import { Box, useMediaQuery } from "@mui/material"

interface LogoProps {}

export const Logo: React.FC<LogoProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box
            sx={{
                color: "primary.main",
                fontWeight: "bold",
                fontSize: isMobile ? "10vw" : "3vw"
            }}>
            BOZLETRANDO
        </Box>
    )
}