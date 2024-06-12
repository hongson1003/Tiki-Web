import * as React from 'react'
import SignIn from '@/components/auth/signIn.auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Tiki - Đăng nhập / Đăng ký',
  description:
    'Mua sắm trực tuyến hàng triệu sản phẩm thời trang nam nữ, đồ điện tử, gia dụng... ✨ Đảm bảo chính hãng ✨ Giao hàng miễn phí ✨ Giao nhanh 1h ✨ Đổi trả dễ dàng',
}

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/')
  }
  return <SignIn />
}
