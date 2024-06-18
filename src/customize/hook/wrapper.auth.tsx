'use client'
import { useEffect } from 'react'
import { useSession, getSession } from 'next-auth/react'

const WrapperAuthen = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()

  return <>{children}</>
}

export default WrapperAuthen
