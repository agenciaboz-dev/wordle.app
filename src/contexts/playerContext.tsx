import { createContext, useState } from "react"
import React from "react"
import { Player } from "../definitions/Player"

interface PlayerContextValue {
    player: Player | null
    setPlayer: (value: Player | null) => void

    helpDrawer: boolean
    setHelpDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

interface PlayerProviderProps {
    children: React.ReactNode
}

const PlayerContext = createContext<PlayerContextValue>({} as PlayerContextValue)

export default PlayerContext

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
    const [player, setPlayer] = useState<Player | null>(null)
    const [helpDrawer, setHelpDrawer] = useState(false)

    return <PlayerContext.Provider value={{ player: player, setPlayer: setPlayer, helpDrawer, setHelpDrawer }}>{children}</PlayerContext.Provider>
}
