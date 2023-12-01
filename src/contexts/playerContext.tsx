import { createContext, useState } from "react"
import React from "react"
import { Player } from "../definitions/Player"

interface PlayerContextValue {
    player: Player | null
    setPlayer: (value: Player | null) => void
}

interface PlayerProviderProps {
    children: React.ReactNode
}

const PlayerContext = createContext<PlayerContextValue>({} as PlayerContextValue)

export default PlayerContext

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
    const [player, setPlayer] = useState<Player | null>(null)

    return <PlayerContext.Provider value={{ player: player, setPlayer: setPlayer }}>{children}</PlayerContext.Provider>
}
