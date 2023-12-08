import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import { usePlayer } from "../../hooks/usePlayer"
import { TaiTextField } from "../TaiTextField"

interface HelpDrawerProps {}

const Letter: React.FC<{ letter: string; correct?: boolean; partial?: boolean; multiple?: boolean }> = ({ letter, correct, partial, multiple }) => {
    return (
        <TaiTextField
            value={letter}
            inputProps={{
                style: {
                    padding: 0,
                    height: "10vw",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center"
                }
            }}
            InputProps={{
                sx: {
                    fontWeight: "bold",
                    bgcolor: correct ? "success.main" : partial ? "warning.main" : "#f1f1f1",
                    outline: "5px solid",
                    outlineColor: multiple ? "primary.main" : "transparent"
                }
            }}
            disabled
        />
    )
}

export const HelpDrawer: React.FC<HelpDrawerProps> = ({}) => {
    const { helpDrawer, setHelpDrawer } = usePlayer()

    return (
        <SwipeableDrawer
            onOpen={() => setHelpDrawer(true)}
            keepMounted
            ModalProps={{ keepMounted: true }}
            anchor={"top"}
            open={helpDrawer}
            onClose={() => setHelpDrawer(false)}
            disableSwipeToOpen={false}
            // slotProps={{ backdrop: { sx: backdropStyle } }}
            PaperProps={{
                elevation: 5,
                sx: { width: "100vw", height: "85vh", bgcolor: "background.default", borderRadius: "0 0 10vw 10vw" }
            }}>
            <Box sx={{ flexDirection: "column", padding: "5vw 10vw", height: "85vh", overflowY: "auto", gap: "2vw" }}>
                <Box sx={{ fontSize: "1.5rem", fontWeight: "bold", alignSelf: "center" }}>como jogar</Box>
                <Box>o objetivo do jogo é descobrir qual é a palavra</Box>
                <Box>digite uma palavra com a quantidade de letras equivalente para receber dicas</Box>
                <Box sx={{ gap: "2vw" }}>
                    <Letter letter="T" />
                    <Letter letter="R" />
                    <Letter letter="E" />
                    <Letter letter="T" />
                    <Letter letter="A" partial />
                </Box>
                <Box>se uma letra estiver laranja, significa que ela existe na palavra mas não está no lugar certo</Box>
                <Box sx={{ gap: "2vw" }}>
                    <Letter letter="T" />
                    <Letter letter="R" correct />
                    <Letter letter="E" />
                    <Letter letter="T" />
                    <Letter letter="A" />
                </Box>
                <Box>se ela estiver verde, significa que essa letra está no lugar certo</Box>
                <Box sx={{ gap: "2vw" }}>
                    <Letter letter="T" />
                    <Letter letter="R" />
                    <Letter letter="E" partial multiple />
                    <Letter letter="T" />
                    <Letter letter="A" correct />
                </Box>
                <Box>se a borda da letra estiver azul, há mais de uma ocorrência dessa letra na palavra!</Box>
                <Box sx={{ gap: "2vw" }}>
                    <Letter letter="T" correct multiple />
                    <Letter letter="R" correct />
                    <Letter letter="E" correct />
                    <Letter letter="T" correct multiple />
                    <Letter letter="A" correct />
                </Box>
                <Box>ao acertar a palavra, você ganha pontos baseado na quantidade de tentativas</Box>
            </Box>
        </SwipeableDrawer>
    )
}
