import React from "react"
import { Box, IconButton } from "@mui/material"

interface MenuButtonProps {
    icon: React.ReactNode
    onClick: () => void
}

export const MenuButton: React.FC<MenuButtonProps> = ({ icon, onClick }) => {
    return (
        <IconButton color="primary" onClick={onClick}>
            {icon}
        </IconButton>
    )
}
