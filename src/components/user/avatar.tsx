import React, { HtmlHTMLAttributes } from 'react'
import { Avatar as MyAvatar } from '@mui/material'

export interface AvatarProps {
  src?: string
  alt?: string
}

const Avatar = (props: AvatarProps) => {
  return <MyAvatar {...props} />
}

export default Avatar
