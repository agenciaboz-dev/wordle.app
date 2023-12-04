import React from "react"
import { Box, IconButton, SxProps } from "@mui/material"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"

interface FullscreenProps {}

const SIZE = "10vw"

export const Fullscreen: React.FC<FullscreenProps> = ({}) => {
    const handleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
            })
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        }
    }

    const icon_style: SxProps = { width: SIZE, height: SIZE }

    return null
    //     (
    //     <Box sx={{ position: "absolute", top: "1vw", right: "1vw" }}>
    //         <IconButton color="primary" sx={{}} onClick={handleFullScreen}>
    //             {!document.fullscreenElement ? <FullscreenIcon sx={icon_style} /> : <FullscreenExitIcon sx={icon_style} />}
    //         </IconButton>
    //     </Box>
    // )
}
