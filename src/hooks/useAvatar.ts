import { useContext } from "react"
import AvatarContext from "../contexts/avatarContext"

export const useAvatar = () => {
    const avatarContext = useContext(AvatarContext)

    return { ...avatarContext }
}
