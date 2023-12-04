import React, { useEffect, useRef, useState } from "react"
import { Box, Button, Grid, Switch, TextField } from "@mui/material"
import { Room } from "../../definitions/Room"
import { Player } from "../../definitions/Player"
import { TaiTextField } from "../../components/TaiTextField"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useRoom } from "../../hooks/useRoom"
import { Letter } from "../../components/Letter"
import BackspaceIcon from "@mui/icons-material/Backspace"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import AbcIcon from "@mui/icons-material/Abc"
import KeyboardIcon from "@mui/icons-material/Keyboard"
interface InputContainerProps {
    room: Room
    player: Player
}

const letters = "ABCÇDEFGHIJKLMNOPQRSTUVXWYZ".split("")
const qwerty_letters = "QWERTYUIOPASDFGHJKLÇZXCVBNM".split("")

export const InputContainer: React.FC<InputContainerProps> = ({ room, player }) => {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])
    const io = useIo()
    const storage = useLocalStorage()

    const { snackbar } = useSnackbar()
    const { setDrawer } = useRoom()

    const [values, setValues] = useState<string[]>(Array(room.difficulty).fill(""))
    const [paused, setPaused] = useState(false)
    const [currentInputIndex, setCurrentInputIndex] = useState(0)
    const [qwerty, setQwerty] = useState(storage.get("bozletrando:qwerty"))

    const correct_chars = room.game!.word.split("")
    const tryied_chars = [...new Set(player.history.join("").split(""))]

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
        if (player.ready) return

        const not_present = tryied_chars.includes(letter.toLowerCase()) && !correct_chars.includes(letter.toLowerCase())
        if (not_present) return

        const _values = [...values]
        _values[currentInputIndex] = letter
        setValues(_values)
        if (currentInputIndex < room.difficulty - 1) {
            setCurrentInputIndex(currentInputIndex + 1)
        }
    }

    const handleBackspaceClick = () => {
        const _values = [...values]

        if (values[currentInputIndex]) {
            _values[currentInputIndex] = ""
            setValues(_values)
        } else {
            _values[currentInputIndex - 1] = ""
            setValues(_values)
            setCurrentInputIndex((currentInputIndex) => {
                const new_index = currentInputIndex - 1
                if (new_index < 0) return 0

                return new_index
            })
        }
    }

    const handleAttempt = () => {
        if (player.ready) return

        if (values.every((item) => !!item)) {
            const attempt = values.join("").toLowerCase()
            if (player.history.includes(attempt)) {
                snackbar({ severity: "warning", text: "voce já meteu essa aí" })
            } else {
                io.emit("game:attempt", attempt)
            }
        }
    }

    useEffect(() => {
        if (!paused) {
            setValues(values.fill(""))
            inputsRef.current[0]?.focus()
        }
    }, [paused])

    useEffect(() => {
        if (room.playing) {
            resumeGame()
        } else {
            pauseGame()
        }
    }, [room.playing])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const letter = e.key.toUpperCase()
            if (letters.includes(letter)) {
                onLetterClick(letter)
            }

            if (letter == "BACKSPACE") {
                handleBackspaceClick()
            }

            if (letter == "ENTER") {
                handleAttempt()
            }

            if (letter == "ARROWLEFT" || letter == "ARROWRIGHT") {
                setCurrentInputIndex((index) => {
                    const new_index = index + (letter == "ARROWLEFT" ? -1 : 1)
                    if (new_index < 0 || new_index > room.difficulty - 1) return letter == "ARROWLEFT" ? 0 : room.difficulty - 1

                    return new_index
                })
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [currentInputIndex, values, tryied_chars, correct_chars])

    useEffect(() => {
        storage.set("bozletrando:qwerty", qwerty)
    }, [qwerty])

    useEffect(() => {
        io.on("game:attempt", () => {
            setValues(values.fill(""))
            // inputsRef.current[0]?.focus()
            setCurrentInputIndex(0)
        })

        io.on("game:attempt:invalid", () => {
            snackbar({ severity: "warning", text: "você inventou essa palavra" })
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
            io.off("game:attempt:invalid")
            io.off("game:win")
            io.off("game:lose")
        }
    }, [])

    return (
        <Box sx={{ flexDirection: "column", width: "100%", gap: "3vw", position: "relative" }}>
            <Box sx={{ display: "flex", gap: "2vw" }}>
                {values.map((value, index) => {
                    const current = index == currentInputIndex
                    return (
                        <Box key={index} onClick={() => setCurrentInputIndex(index)} sx={{ flexShrink: 1 }}>
                            <TaiTextField
                                value={value}
                                onChange={(e) => handleChange(e.target.value, index)}
                                inputRef={(el) => (inputsRef.current[index] = el)}
                                inputProps={{
                                    maxLength: 1,
                                    style: {
                                        padding: 0,
                                        height: "10vw",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: "center"
                                    }
                                }}
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

            <Button variant="contained" sx={{ borderRadius: "0 7vw", color: "secondary.main", fontWeight: "bold" }} onClick={handleAttempt}>
                enviar
            </Button>

            <Grid container columns={10} spacing={1}>
                {(qwerty ? qwerty_letters : letters).map((letter) => {
                    const _letter = letter.toLowerCase()
                    const not_present = tryied_chars.includes(_letter) && !correct_chars.includes(_letter)
                    const exists = tryied_chars.includes(_letter) && correct_chars.includes(_letter)

                    const matching_chars = correct_chars.map((char, index) => {
                        if (char != _letter) return false

                        const attempt_includes = player.history.map((attempt) => attempt.split("")[index] == char)
                        return attempt_includes.includes(true)
                    })
                    const matching = matching_chars.includes(true)

                    return (
                        <Letter
                            key={letter}
                            letter={letter}
                            onLetterClick={onLetterClick}
                            exists={exists}
                            matching={matching}
                            not_present={not_present}
                        />
                    )
                })}
                <Grid item xs={1}>
                    <Button onClick={handleBackspaceClick} sx={{ minWidth: 0 }}>
                        <BackspaceIcon />
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Switch
                        checked={qwerty}
                        onChange={(_, checked) => setQwerty(checked)}
                        icon={<AbcIcon sx={{ bgcolor: "primary.main", borderRadius: "100%", width: "6vw", height: "6vw" }} />}
                        checkedIcon={
                            <KeyboardIcon color="secondary" sx={{ bgcolor: "primary.main", borderRadius: "100%", width: "5vw", height: "5vw" }} />
                        }
                        sx={{}}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
