import React from "react"
import { Box, ThemeProvider } from "@mui/material"
import { SnackbarProvider } from "burgos-snackbar"
import { ConfirmDialogProvider } from "burgos-confirm"
import { IoProvider } from "./contexts/ioContext"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { AvatarProvider } from "./contexts/avatarContext"

interface ProvidersProps {
    children?: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const mui_theme = useMuiTheme()

    return (
        <ThemeProvider theme={mui_theme}>
            <SnackbarProvider>
                <ConfirmDialogProvider>
                    <IoProvider>
                        <AvatarProvider>{children}</AvatarProvider>
                    </IoProvider>
                </ConfirmDialogProvider>
            </SnackbarProvider>
        </ThemeProvider>
    )
}
