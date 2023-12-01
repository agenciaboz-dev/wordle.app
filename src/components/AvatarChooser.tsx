import React, { useState } from "react"
import { Avatar, Box, IconButton } from "@mui/material"
import { TaiTextField } from "./TaiTextField"
import { useFormik } from "formik"
import { useAvatar } from "../hooks/useAvatar"
import { AvatarList } from "./AvatarList"

interface AvatarChooserProps {}

const AVATAR_SIZE = "10vw"

export const AvatarChooser: React.FC<AvatarChooserProps> = ({}) => {
    const { name, avatar, setName, setAvatar } = useAvatar()

    const [choosingAvatar, setChoosingAvatar] = useState(false)

    return (
        <Box sx={{ flexDirection: "column", alignItems: "center", gap: "1vw", width: "100%" }}>
            <AvatarList open={choosingAvatar} handleClose={() => setChoosingAvatar(false)} />
            <IconButton onClick={() => setChoosingAvatar((value) => !value)}>
                <Avatar src={avatar} sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, bgcolor: "primary.main" }} />
            </IconButton>

            <TaiTextField label="apelido" value={name} onChange={(ev) => setName(ev.target.value)} fullWidth />
        </Box>
    )
}
