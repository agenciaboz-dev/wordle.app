import { useContext } from "react"
import PlayerContext from "../contexts/playerContext"

export const usePlayer = () => {
    const playerContext = useContext(PlayerContext)

    return { ...playerContext }
}
