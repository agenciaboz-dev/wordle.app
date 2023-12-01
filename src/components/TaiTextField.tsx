import React from "react"
import { SxProps, TextField, TextFieldProps } from "@mui/material"
import { textFieldStyle } from "../style/textfield"
import { colors } from "../style/colors"

export const TaiTextField: React.FC<TextFieldProps> = (props) => {
    const webkitbg: SxProps = {
        "& .MuiInputBase-input.MuiOutlinedInput-input:-webkit-autofill": {
            // "-webkit-box-shadow": ` 0 0 0 100px ${colors.background.default} inset`,
            borderRadius: "initial"
        }
    }

    return <TextField {...props} sx={{ ...textFieldStyle, ...webkitbg }} />
}
