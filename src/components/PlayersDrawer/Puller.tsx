import React from "react"
import { Box, Paper } from "@mui/material"
import { Fullscreen } from "../Fullscreen"

interface PullerProps {
    bleeding_edge: number
}

export const Puller: React.FC<PullerProps> = ({ bleeding_edge }) => {
    return (
        <Box
            sx={{
                position: "absolute",
                top: -bleeding_edge,
                height: bleeding_edge,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: "visible",
                right: 0,
                left: 0,
                borderRadius: "10vw 10vw 0 0",
                bgcolor: "background.default",
                justifyContent: "center",
                alignItems: "center",
                borderTop: "1px solid"
            }}>
            <Box
                sx={{
                    width: "10vw",
                    height: 6,
                    bgcolor: "primary.main",
                    borderRadius: 3
                }}
            />
            <Fullscreen />
        </Box>
    )
}
