import React, { useEffect, useRef, useState } from "react"
import { Box, TextField } from "@mui/material"
import { Room } from "../../definitions/Room"
import { Player } from "../../definitions/Player"
import { TaiTextField } from "../../components/TaiTextField"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"

interface InputContainerProps {
    room: Room
    player: Player
}

export const InputContainer: React.FC<InputContainerProps> = ({ room, player }) => {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])
    const io = useIo()

    const { snackbar } = useSnackbar()

    const [values, setValues] = useState<string[]>(Array(room.difficulty).fill(""))

    const handleChange = (value: string, index: number) => {
        const newValues = [...values]
        newValues[index] = value
        setValues(newValues)

        // Focus logic
        if (value && index < room.difficulty - 1) {
            inputsRef.current[index + 1]?.focus()
        } else if (!value && index > 0) {
            inputsRef.current[index - 1]?.focus()
        }
    }

    useEffect(() => {
        if (values.every((item) => !!item)) {
            const attempt = values.join("")
            if (player.history.includes(attempt)) {
                snackbar({ severity: "warning", text: "voce já meteu essa aí" })
            } else {
                io.emit("game:attempt", attempt)
            }
        }
    }, [values])

    useEffect(() => {
        io.on("game:attempt", (data) => {
            // console.log(data)
            setValues(values.fill(""))
            inputsRef.current[0]?.focus()
        })

        return () => {
            io.off("game:attempt")
        }
    }, [])

    return (
        <Box sx={{ display: "flex", gap: "5vw" }}>
            {values.map((value, index) => (
                <TaiTextField
                    key={index}
                    value={value}
                    onChange={(e) => handleChange(e.target.value, index)}
                    inputRef={(el) => (inputsRef.current[index] = el)}
                    inputProps={{ maxLength: 1 }}
                    autoFocus={index == 0}
                    InputProps={{ sx: { fontWeight: "bold" } }}
                />
            ))}
        </Box>
    )
}
