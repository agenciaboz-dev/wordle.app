import { Snackbar } from "burgos-snackbar"
import "./App.css"
import { Providers } from "./Providers"
import { Routes } from "./Routes"
import { ConfirmDialog } from "burgos-confirm"
import { Box } from "@mui/material"
import { Fullscreen } from "./components/Fullscreen"

const App: React.FC = () => {
    return (
        <Providers>
            <Box sx={{ width: "100%", height: "100%", bgcolor: "#1f1f1f", justifyContent: "center" }}>
                <Box sx={{ width: "100%", height: "100%", bgcolor: "background.default" }}>
                    <Routes />
                </Box>
            </Box>
            <Snackbar />
            <ConfirmDialog />
        </Providers>
    )
}

export default App
