'use client'
import React, { useEffect, useRef } from 'react'
import Popover from '@mui/material/Popover'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

interface ContentPopoverProps {
  handleClose: () => void
}

const ContentPopover = ({ handleClose }: ContentPopoverProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('click', (e) => {
        handleClose()
      })
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('click', (e) => {
          console.log('click inside popover')
        })
      }
    }
  }, [])

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        ' & > a': {
          cursor: 'pointer',
          padding: '5px 10px',
          '&:hover': {
            backgroundColor: '#E7E7E7',
          },
        },
      }}
    >
      <Link href={'/customer/account'}>
        <Typography>Thông tin cá nhân</Typography>
      </Link>
      <Link href={'#'}>
        <Typography>Đơn hàng của tôi</Typography>
      </Link>
      <Link href={'#'} onClick={() => signOut()}>
        <Typography>Đăng xuất</Typography>
      </Link>
    </Box>
  )
}

const AccountPopover = ({ children }: { children: React.ReactNode }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <div onClick={handleClick}>{children}</div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ContentPopover handleClose={handleClose} />
      </Popover>
    </div>
  )
}

export default AccountPopover
