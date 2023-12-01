import React from "react"
import { Avatar, Box, IconButton, MenuItem, Modal, Paper, useMediaQuery } from "@mui/material"
import { avatar_list } from "../assets/avatar_list"
import { useAvatar } from "../hooks/useAvatar"

interface AvatarListProps {
    open: boolean
    handleClose: () => void
}

export const AvatarList: React.FC<AvatarListProps> = ({ open, handleClose }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const { setAvatar } = useAvatar()

    const AVATAR_SIZE = isMobile ? "17vw" : "4.5vw"

    const handleAvatarClick = (url: string) => {
        setAvatar(url)
        handleClose()
    }

    return (
        <Modal open={open} onClose={handleClose} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
            <Paper
                sx={{
                    width: isMobile ? "80vw" : "40vw",
                    height: isMobile ? "80vw" : "40vw",
                    bgcolor: "background.default",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    gap: isMobile ? "2vw" : "1vw",
                    alignContent: "flex-start",
                    padding: isMobile ? "5vw" : "2vw",
                    overflowY: "auto"
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
