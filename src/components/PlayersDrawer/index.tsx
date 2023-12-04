import React from "react"
import { Box, Button, Drawer, Paper, SwipeableDrawer } from "@mui/material"
import { useRoom } from "../../hooks/useRoom"
import { Room } from "../../definitions/Room"
import { Player } from "../../definitions/Player"
import { PlayersList } from "./PlayersList"
import { backdropStyle } from "../../style/backdrop"
import { useIo } from "../../hooks/useIo"
import { Star } from "@mui/icons-material"

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

    const handleBackToRoom = () => {
        io.emit("game:stop")
    }

    return (
        <SwipeableDrawer
            onOpen={() => setDrawer(true)}
            keepMounted
            anchor={"bottom"}
            open={open}
            onClose={() => setDrawer(false)}
            // slotProps={{ backdrop: { sx: backdropStyle } }}
            PaperProps={{ elevation: 5, sx: { width: "100vw", height: "85vh", bgcolor: "background.default", borderRadius: "10vw 10vw 0 0" } }}>
            <Box sx={{ flexDirection: "column", padding: "10vw", height: "100%" }}>
                <Box sx={{ flexDirection: "column", justifyContent: "space-between", height: "100%", gap: "5vw" }}>
                    {!room.playing && (
                        <Box
                            sx={{
                                alignSelf: "center",
                                fontWeight: "bold",
                                color: player.history[player.history.length - 1] == room.game?.word ? "success.main" : "error.main",
                                alignItems: "center",
                                gap: "2vw"
                            }}>
                            <Star />
                            {room.game?.word.toUpperCase()}
                            <Star />
                        </Box>
                    )}
                    {!room.playing &&
                        (player.id == room.host.id ? (
                            <Button
                                variant="contained"
                                sx={{ borderRadius: "0 5vw", color: "secondary.main", fontWeight: "bold" }}
                                onClick={handleNextRound}>
                                começar próximo round
                            </Button>
                        ) : (
                            <Paper
                                sx={{ borderRadius: "0 10vw", bgcolor: "warning.main", color: "secondary.main", padding: "5vw", fontWeight: "bold" }}>
                                esperando o host começar
                            </Paper>
                        ))}
                    <PlayersList players={room.players.filter((item) => item != player)} player={player} />
                    {player.id == room.host.id ? (
                        <Button
                            variant="contained"
                            sx={{ borderRadius: "0 5vw", color: "secondary.main", marginTop: "auto" }}
                            onClick={handleBackToRoom}>
                            voltar para sala
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{ borderRadius: "0 5vw", color: "secondary.main", marginTop: "auto" }}
                            onClick={() => io.emit("room:leave", { player_id: player.id, room_id: room.id })}>
                            sair da sala
                        </Button>
                    )}
                </Box>
            </Box>
        </SwipeableDrawer>
    )
}
