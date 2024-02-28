import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import { Game } from "../definitions/Game"
import { useRoom } from "../hooks/useRoom"

interface HistoryDrawerProps {
    game: Game
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ game }) => {
    const { historyDrawer, setHistoryDrawer } = useRoom()

    const list = [...game.history.slice(0, -1)]

    return (
        <SwipeableDrawer
            onOpen={() => setHistoryDrawer(true)}
            keepMounted
            ModalProps={{ keepMounted: true }}
            anchor={"left"}
            open={historyDrawer}
            onClose={() => setHistoryDrawer(false)}
            disableSwipeToOpen={false}
            // slotProps={{ backdrop: { sx: backdropStyle } }}
            PaperProps={{
                elevation: 5,
                sx: { width: "90vw", height: "100vh", bgcolor: "background.default", borderRadius: "0 10vw 10vw 0" }
            }}>
            <Box sx={{ flexDirection: "column", padding: "5vw 10vw", height: "85vh", overflowY: "auto", gap: "2vw" }}>
                <Box sx={{ fontSize: "1.5rem", fontWeight: "bold", alignSelf: "center" }}>histórico de palavras</Box>
                {list.map((word, index) => (
                    <Box key={word + index} sx={{ alignItems: "center", gap: "3vw" }}>
                        <Box
                            sx={{
                                minWidth: "7vw",
                                aspectRatio: "1/1",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "100%",
                                bgcolor: "primary.main",
                                color: "secondary.main",
                                fontWeight: "bold"
                            }}>
                            {index + 1}
                        </Box>
                        {word}
                    </Box>
                ))}
            </Box>
        </SwipeableDrawer>
    )
}
