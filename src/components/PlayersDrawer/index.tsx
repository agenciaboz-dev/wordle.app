import React from "react"
import { Box, Button, Drawer, Paper } from "@mui/material"
import { useRoom } from "../../hooks/useRoom"
import { Room } from "../../definitions/Room"
import { Player } from "../../definitions/Player"
import { PlayersList } from "./PlayersList"
import { backdropStyle } from "../../style/backdrop"
import { useIo } from "../../hooks/useIo"

interface PlayersDrawerProps {
    room: Room
    player: Player
}

export const PlayersDrawer: React.FC<PlayersDrawerProps> = ({ room, player }) => {
    const { drawer: open, setDrawer } = useRoom()
    const io = useIo()

    const handleNextRound = () => {
        io.emit("game:next_round")
    }

    return (
        <Drawer
            keepMounted
            anchor={"bottom"}
            open={open}
            onClose={() => setDrawer(false)}
            // slotProps={{ backdrop: { sx: backdropStyle } }}
            PaperProps={{ elevation: 5, sx: { width: "100vw", height: "85vh", bgcolor: "background.default", borderRadius: "10vw 10vw 0 0" } }}>
            <Box sx={{ flexDirection: "column", gap: "5vw", padding: "10vw" }}>
                {!room.playing &&
                    (player.id == room.host.id ? (
                        <Button
                            variant="contained"
                            sx={{ borderRadius: "0 5vw", color: "secondary.main", fontWeight: "bold" }}
                            onClick={handleNextRound}>
                            começar próximo round
                        </Button>
                    ) : (
                        <Paper sx={{ borderRadius: "0 10vw", bgcolor: "warning.main", color: "secondary.main", padding: "5vw", fontWeight: "bold" }}>
                            esperando o host começar
                        </Paper>
                    ))}
                <PlayersList players={room.players.filter((item) => item != player)} player={player} />
            </Box>
        </Drawer>
    )
}
