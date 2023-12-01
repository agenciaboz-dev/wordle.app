import { useContext } from "react"
import RoomContext from "../contexts/roomContext"

export const useRoom = () => {
    const roomContext = useContext(RoomContext)

    return { ...roomContext }
}
