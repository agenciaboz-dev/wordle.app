import { createContext, useState } from "react"
import React from "react"

interface AvatarContextValue {
    name: string
    avatar: string
    setName: React.Dispatch<React.SetStateAction<string>>
    setAvatar: React.Dispatch<React.SetStateAction<string>>
}

interface AvatarProviderProps {
    children: React.ReactNode
}

const AvatarContext = createContext<AvatarContextValue>({} as AvatarContextValue)

export default AvatarContext

export const AvatarProvider: React.FC<AvatarProviderProps> = ({ children }) => {
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")

    return <AvatarContext.Provider value={{ name, setName, avatar, setAvatar }}>{children}</AvatarContext.Provider>
}
