import React from 'react'
import {Box} from '@mui/material'
import { Logo } from '../components/Logo'
import { RoomsList } from '../components/RoomsList'

interface HomeProps {
    
}

export const Home:React.FC<HomeProps> = ({  }) => {
    
    return (
        <Box sx={{ flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', padding: '5vw'}}>
            <Logo />

            <RoomsList />
        </Box>
    )
}