'use client'
import { useEffect } from 'react'
import { useSession, getSession } from 'next-auth/react'

const WrapperAuthen = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log('Session: ', session)
  }, [session])

  return <>{children}</>
}

export default WrapperAuthen
