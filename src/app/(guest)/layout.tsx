import Header from '@/components/header/header.component'
import type { Metadata } from 'next'
import Footer from '@/components/footer/footer.component'
import { Box } from '@mui/material'

export const metadata: Metadata = {
  title: 'Tiki - Đặt hàng online, giao nhanh, giá rẻ',
  description:
    'Mua sắm trực tuyến hàng triệu sản phẩm thời trang nam nữ, đồ điện tử, gia dụng... ✨ Đảm bảo chính hãng ✨ Giao hàng miễn phí ✨ Giao nhanh 1h ✨ Đổi trả dễ dàng',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
