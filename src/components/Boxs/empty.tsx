import React from 'react'
import { Box, Typography } from '@mui/material'

interface EmptyProps {
  title?: string
  description?: string
  icon?: any
}

const Empty = (props: EmptyProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        maxHeight: '50%',
        height: '100%',
        gap: '15px',
      }}
    >
      <Typography variant="h4" color="textSecondary" align="center">
        {props.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {props.description}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {props.icon}
      </Typography>
    </Box>
  )
}

export default Empty
