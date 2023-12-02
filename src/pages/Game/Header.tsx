import React, { useEffect } from "react"
import { Box, IconButton } from "@mui/material"
import { Room } from "../../definitions/Room"
import { Star } from "@mui/icons-material"
import { getDifficultyColor } from "../../tools/get_difficulty_color"
import useMeasure from "react-use-measure"
import { Player } from "../../definitions/Player"
import Groups2Icon from "@mui/icons-material/Groups2"
import { useRoom } from "../../hooks/useRoom"

interface HeaderProps {
    room: Room
    player: Player
    setHeaderHeight: React.Dispatch<React.SetStateAction<number>>
}

export const Header: React.FC<HeaderProps> = ({ room, setHeaderHeight, player }) => {
    const [ref, { height }] = useMeasure()

    const { setDrawer } = useRoom()

    useEffect(() => {
        setHeaderHeight(height)
    }, [height])

    return (
        <Box
            ref={ref}
            sx={{
                fontSize: "7vw",
                fontWeight: "bold",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                bgcolor: "primary.main",
                color: "secondary.main",
                padding: "5vw"
            }}>
            <Box sx={{ alignItems: "center", gap: "5vw" }}>
                <Box
                    sx={{
                        color: `${getDifficultyColor(room.difficulty)}.main`,
                        alignItems: "center",
                        bgcolor: "secondary.main",
                        borderRadius: "100%",
                        aspectRatio: "1/1",
                        fontSize: "5vw",
                        width: "15vw",
                        justifyContent: "center"
                    }}>
                    <Star sx={{ width: "5vw" }} />
                    {room.difficulty}
                </Box>
                {room.name}
            </Box>
            <IconButton color="secondary" onClick={() => setDrawer(true)}>
                <Groups2Icon sx={{ width: "10vw", height: "10vw" }} />
            </IconButton>
        </Box>
    )
}
