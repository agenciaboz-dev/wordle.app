import { Snackbar } from "burgos-snackbar"
import "./App.css"
import { Providers } from "./Providers"
import { Routes } from "./Routes"
import { ConfirmDialog } from "burgos-confirm"
import { Box, useMediaQuery } from "@mui/material"

const App: React.FC = () => {
    const isMobile = useMediaQuery('(orientation: portrait)')

    return (
        <Providers>
            <Box sx={{ width: "100%", height: "100%", bgcolor: "#1f1f1f", justifyContent: "center" }}>
                <Box sx={{ width: isMobile ? "100%" : "400px", height: "100%", bgcolor: "background.default" }}>
                    <Routes />
                </Box>
            </Box>
            <Snackbar />
            <ConfirmDialog />
        </Providers>
    )
}

export default App
