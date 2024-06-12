import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import styles from './layout.module.css'
import SessionWrapper from '@/lib/sessionWrapper'
import ThemeRegistry from '@/config/ThemeRegistry'
import NextProgressBarWrapper from '@/config/NextProgressBar'
import ToastContainer from '@/customize/mui/toast'

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
    <html lang="en">
      <ThemeRegistry>
        <body>
          <div className={styles.container}>
            <NextProgressBarWrapper>
              <SessionWrapper>
                {children}
                <ToastContainer />
              </SessionWrapper>
            </NextProgressBarWrapper>
          </div>
        </body>
      </ThemeRegistry>
    </html>
  )
}
