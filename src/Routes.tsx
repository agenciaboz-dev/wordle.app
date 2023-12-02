import React from "react"
import { Routes as ReacRoutes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { useRoom } from "./hooks/useRoom"
import { RoomPage } from "./pages/RoomPage"
import { usePlayer } from "./hooks/usePlayer"
import { Game } from "./pages/Game"
import { Player } from "./definitions/Player"
import { Room } from "./definitions/Room"

interface RoutesProps {}

const RoomPlayerRoutes: React.FC<{ player: Player; room: Room }> = ({ room, player }) => (
    <ReacRoutes>
        <Route path="/room" element={<RoomPage room={room} player={player} />} />

        {room.game && <Route path="*" element={<Game room={room} player={player} />} />}
        <Route path="*" element={<RoomPage room={room} player={player} />} />
    </ReacRoutes>
)

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { room } = useRoom()
    const { player } = usePlayer()

    return room && player ? (
        <RoomPlayerRoutes room={room} player={player} />
    ) : (
        <ReacRoutes>
            <Route index element={<Home />} />
            <Route path="*" element={<Home />} />
        </ReacRoutes>
    )
}
