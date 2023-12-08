import React from "react"
import { Box, Button, Drawer, Paper, SwipeableDrawer, Typography } from "@mui/material"
import { useRoom } from "../../hooks/useRoom"
import { Room } from "../../definitions/Room"
import { Player } from "../../definitions/Player"
import { PlayersList } from "./PlayersList"
import { useIo } from "../../hooks/useIo"
import { Puller } from "./Puller"
import { WordContainer } from "./WordContainer"
import { MenusButtons } from "./MenuButtons"

interface PlayersDrawerProps {
    room: Room
    player: Player
}

const bleeding_edge = 50

export const PlayersDrawer: React.FC<PlayersDrawerProps> = ({ room, player }) => {
    const { drawer: open, setDrawer } = useRoom()
    const io = useIo()

    const handleNextRound = () => {
        io.emit("game:next_round")
    }

    return (
        <SwipeableDrawer
            onOpen={() => setDrawer(true)}
            keepMounted
            ModalProps={{ keepMounted: true }}
            swipeAreaWidth={bleeding_edge}
            anchor={"bottom"}
            open={open}
            onClose={() => setDrawer(false)}
            disableSwipeToOpen={false}
            // slotProps={{ backdrop: { sx: backdropStyle } }}
            PaperProps={{
                elevation: 5,
                sx: { width: "100vw", height: "85vh", bgcolor: "background.default", overflow: "visible" }
            }}>
            <Puller bleeding_edge={bleeding_edge} />
            <Box sx={{ flexDirection: "column", padding: "10vw", height: "100%", paddingTop: 0 }}>
                <Box sx={{ flexDirection: "column", justifyContent: "space-between", height: "100%", gap: "5vw" }}>
                    <WordContainer player={player} room={room} />
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
                    <PlayersList players={room.players.filter((item) => item != player)} player={player} room={room} />
                    <MenusButtons player={player} room={room} />
                </Box>
            </Box>
        </SwipeableDrawer>
    )
}
