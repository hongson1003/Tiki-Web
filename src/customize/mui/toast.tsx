'use client'
import CloseIcon from '@mui/icons-material/Close'
import { Alert } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import * as React from 'react'

interface ToastProps {
  success: (message: string) => void
  error: (message: string) => void
}

export const toast = {} as ToastProps

export default function ToastContainer() {
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState('' as string)
  const [status, setStatus] = React.useState('' as string)

  const handleClick = () => {
    setOpen(true)
  }

  toast.success = (message: string) => {
    setMessage(message)
    setStatus('success')
    handleClick()
  }

  toast.error = (message: string) => {
    setMessage(message)
    setStatus('error')
    handleClick()
  }

  const handleClose = () => {
    setMessage('')
    setOpen(false)
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      action={action}
    >
      <Alert
        onClose={handleClose}
        severity={status as 'success' | 'error'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
