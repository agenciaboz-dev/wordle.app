import React, { useEffect, useRef, useState } from "react"
import { Box, Button, TextField } from "@mui/material"
import { Room } from "../../definitions/Room"
import { Player } from "../../definitions/Player"
import { TaiTextField } from "../../components/TaiTextField"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import normalize from "../../tools/normalize"
import { useRoom } from "../../hooks/useRoom"
import { Letter } from "../../components/Letter"
import BackspaceIcon from "@mui/icons-material/Backspace"

interface InputContainerProps {
    room: Room
    player: Player
}

const letters = "QWERTYUIOPASDFGHJKLÇZXCVBNM".split("")

export const InputContainer: React.FC<InputContainerProps> = ({ room, player }) => {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])
    const io = useIo()

    const { snackbar } = useSnackbar()
    const { setDrawer } = useRoom()

    const [values, setValues] = useState<string[]>(Array(room.difficulty).fill(""))
    const [paused, setPaused] = useState(false)
    const [currentInputIndex, setCurrentInputIndex] = useState(0)

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

    const pauseGame = () => {
        setPaused(true)
        setDrawer(true)
    }

    const resumeGame = () => {
        setDrawer(false)
        setPaused(false)
    }

    const onLetterClick = (letter: string) => {
        const _values = [...values]
        _values[currentInputIndex] = letter
        setValues(_values)
        if (currentInputIndex < room.difficulty - 1) {
            setCurrentInputIndex(currentInputIndex + 1)
        }
    }

    const handleBackspaceClick = () => {
        const _values = [...values]
        _values[currentInputIndex] = ""
        setValues(_values)
    }

    useEffect(() => {
        if (!paused) {
            setValues(values.fill(""))
            inputsRef.current[0]?.focus()
        }
    }, [paused])

    useEffect(() => {
        if (values.every((item) => !!item)) {
            const attempt = values.join("").toLowerCase()
            if (player.history.includes(attempt)) {
                snackbar({ severity: "warning", text: "voce já meteu essa aí" })
            } else {
                io.emit("game:attempt", attempt)
            }
        }
    }, [values])

    useEffect(() => {
        if (room.playing) {
            resumeGame()
        } else {
            pauseGame()
        }
    }, [room.playing])

    useEffect(() => {
        io.on("game:attempt", () => {
            setValues(values.fill(""))
            // inputsRef.current[0]?.focus()
            setCurrentInputIndex(0)
        })

        io.on("game:win", (score) => {
            pauseGame()
            snackbar({ severity: "success", text: `uhuuu você ganhou ${score} pontos` })
        })

        io.on("game:lose", () => {
            pauseGame()
            snackbar({ severity: "info", text: "foi moleque" })
        })

        return () => {
            io.off("game:attempt")
            io.off("game:win")
            io.off("game:lose")
        }
    }, [])

    return (
        <Box sx={{ flexDirection: "column", width: "100%", gap: "5vw" }}>
            <Box sx={{ display: "flex", gap: "5vw" }}>
                {values.map((value, index) => {
                    const current = index == currentInputIndex
                    return (
                        <Box key={index} onClick={() => setCurrentInputIndex(index)} sx={{ flexShrink: 1 }}>
                            <TaiTextField
                                value={value}
                                onChange={(e) => handleChange(e.target.value, index)}
                                inputRef={(el) => (inputsRef.current[index] = el)}
                                inputProps={{ maxLength: 1 }}
                                sx={{ pointerEvents: "none" }}
                                autoFocus={index == 0}
                                InputProps={{
                                    sx: {
                                        fontWeight: "bold",
                                        outline: current ? "3px solid" : "",
                                        "&.Mui-disabled": { color: "primary.main" }
                                    }
                                }}
                                disabled
                            />
                        </Box>
                    )
                })}
            </Box>

            <Box sx={{ gap: "2vw", flexWrap: "wrap", alignItems: "center" }}>
                {letters.map((letter) => (
                    <Letter key={letter} letter={letter} onLetterClick={onLetterClick} />
                ))}
                <Button onClick={handleBackspaceClick}>
                    <BackspaceIcon />
                </Button>
            </Box>
        </Box>
    )
}
