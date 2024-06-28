import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

export default function AdminLayout() {
    return (
        <Box sx={{ margin: 0, padding: 0}}>
            <Navbar />
            <Outlet />
        </Box>
    )
}
