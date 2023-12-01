import React from "react"
import { Avatar, Box, IconButton, MenuItem, Modal, Paper } from "@mui/material"
import { avatar_list } from "../assets/avatar_list"
import { useAvatar } from "../hooks/useAvatar"

interface AvatarListProps {
    open: boolean
    handleClose: () => void
}

const AVATAR_SIZE = "4.5vw"

export const AvatarList: React.FC<AvatarListProps> = ({ open, handleClose }) => {
    const { setAvatar } = useAvatar()

    const handleAvatarClick = (url: string) => {
        setAvatar(url)
        handleClose()
    }

    return (
        <Modal open={open} onClose={handleClose} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
            <Paper
                sx={{
                    width: "20vw",
                    height: "20vw",
                    bgcolor: "background.default",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    gap: "1vw",
                    alignContent: "flex-start",
                    padding: "1vw"
                }}>
                {avatar_list.map((url) => (
                    <IconButton key={url} onClick={() => handleAvatarClick(url)}>
                        <Avatar src={url} sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE }} />
                    </IconButton>
                ))}
            </Paper>
        </Modal>
    )
}
