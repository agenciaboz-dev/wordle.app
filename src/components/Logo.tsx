import React from 'react'
import {Box} from '@mui/material'

interface LogoProps {
    
}

export const Logo:React.FC<LogoProps> = ({  }) => {
    
    return (
        <Box
            sx={{
                color: "primary.main",
                fontWeight: "bold",
                fontSize: "2.5rem"
            }}>
            BOZLETRANDO
        </Box>
    )
}