import React from "react"
import { SxProps, TextField, TextFieldProps, useMediaQuery } from "@mui/material"
import { textFieldStyle } from "../style/textfield"
import { colors } from "../style/colors"

export const TaiTextField: React.FC<TextFieldProps> = (props) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const webkitbg: SxProps = {
        "& .MuiInputBase-input.MuiOutlinedInput-input:-webkit-autofill": {
            // "-webkit-box-shadow": ` 0 0 0 100px ${colors.background.default} inset`,
            borderRadius: "initial"
        }
    }

    return (
        <TextField
            {...props}
            InputProps={{ sx: { borderRadius: isMobile ? "0 5vw" : "0 1vw", ...props.InputProps?.sx } }}
            sx={{ ...webkitbg, ...props.sx }}
        />
    )
}
