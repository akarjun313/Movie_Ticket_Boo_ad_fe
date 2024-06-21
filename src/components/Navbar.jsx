import React from 'react'
import { Box, Button, Container } from '@mui/material'

export default function Navbar() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', height:'100%', marginTop: 8 }}>
        <Button variant="text" color="secondary" size="large">Movies</Button>
        <Button variant="text" color="secondary" size="large">Theatres</Button>
        <Button variant="text" color="secondary" size="large">Users</Button>
        <Button variant="text" color="secondary" size="large">Report</Button>
    </Box>
  )
}
