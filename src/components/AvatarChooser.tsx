import React, { useState } from "react"
import { Avatar, Box, IconButton, useMediaQuery } from "@mui/material"
import { TaiTextField } from "./TaiTextField"
import { useAvatar } from "../hooks/useAvatar"
import { AvatarList } from "./AvatarList"

interface AvatarChooserProps {}

export const AvatarChooser: React.FC<AvatarChooserProps> = ({}) => {
    const { name, avatar, setName, setAvatar } = useAvatar()
    const isMobile = useMediaQuery("(orientation: portrait)")

    const [choosingAvatar, setChoosingAvatar] = useState(false)

    const AVATAR_SIZE = isMobile ? "50vw" : "20vw"

    return (
        <Box sx={{ flexDirection: "column", alignItems: "center", gap: isMobile ? "5vw" : "1vw", width: "100%" }}>
            <AvatarList open={choosingAvatar} handleClose={() => setChoosingAvatar(false)} />
            <IconButton onClick={() => setChoosingAvatar((value) => !value)}>
                <Avatar src={avatar} sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, bgcolor: "primary.main" }} />
            </IconButton>

            <TaiTextField label="apelido" value={name} onChange={(ev) => setName(ev.target.value)} sx={{ width: isMobile ? "100%" : "20vw" }} />
        </Box>
    )
}
