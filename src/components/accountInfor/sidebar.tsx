import { Box, Typography } from '@mui/material'
import React from 'react'

const Sidebar = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
      }}
    >
      <Typography
        component="p"
        sx={{
          padding: ' 5px 10px',
          fontWeight: 'bold',
        }}
      >
        Danh mục
      </Typography>
      <Box></Box>
    </Box>
  )
}

export default Sidebar
