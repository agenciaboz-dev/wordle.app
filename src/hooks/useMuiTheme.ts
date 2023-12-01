import { createTheme } from "@mui/material"
import { colors } from "../style/colors"

export const useMuiTheme = () => {
    const THEME = createTheme({
        typography: {
            fontFamily: ["Montserrat", "Futura Medium BT"].join(",")
        },
        palette: {
            primary: {
                main: colors.primary
            },
            secondary: {
                main: colors.secondary
            },

            background: {
                default: colors.background.default,
                paper: colors.background.paper
            },

            text: {
                primary: colors.text.primary,
                secondary: colors.text.secondary
            },

            success: {
                main: colors.success
            },

            warning: {
                main: colors.warning
            }
        }
    })

    return THEME
}
