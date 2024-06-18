'use client'
import React from 'react'
import { QueryClientProvider } from 'react-query'
import queryClient from '@/config/queryClient'

const WrapperQueryClient = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default WrapperQueryClient
