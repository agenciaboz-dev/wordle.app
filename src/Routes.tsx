import React from "react"
import { Routes as ReacRoutes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { useRoom } from "./hooks/useRoom"
import { RoomPage } from "./pages/RoomPage"
import { usePlayer } from "./hooks/usePlayer"
import { Game } from "./pages/Game"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { room } = useRoom()
    const { player } = usePlayer()

    return (
        <ReacRoutes>
            <Route index element={<Home />} />
            {room && player && <Route path="/room" element={<RoomPage room={room} player={player} />} />}
            {room && player && <Route path="/game" element={<Game room={room} player={player} />} />}
            <Route path="*" element={<Home />} />
        </ReacRoutes>
    )
}
