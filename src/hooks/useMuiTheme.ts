import { createTheme } from "@mui/material"

export const useMuiTheme = () => {

    const THEME = createTheme({
        typography: {
            fontFamily: ["Montserrat", "Futura Medium BT"].join(",")
        },
        palette: {
            // mode: darkMode ? "dark" : "light",

            // primary: {
            //     main: colors.primary
            // },
            // secondary: {
            //     main: colors.secondary
            // },

            // background: {
            //     default: colors.background.primary,
            //     paper: colors.background.secondary
            // },

            // text: {
            //     primary: colors.text.primary,
            //     secondary: colors.text.secondary
            // },

            // success: {
            //     main: colors.success
            // },

            // warning: {
            //     main: colors.warning
            // }
        }
    })

    return THEME
}
