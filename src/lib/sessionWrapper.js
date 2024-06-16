'use client'
import React, { useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'

const SessionWrapper = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default SessionWrapper
