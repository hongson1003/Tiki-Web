// RootLayout.js
import type { Metadata } from 'next'
import './globals.css'
import styles from './layout.module.css'
import SessionWrapper from '@/lib/sessionWrapper'
import ThemeRegistry from '@/config/ThemeRegistry'
import NextProgressBarWrapper from '@/config/NextProgressBar'
import ToastContainer from '@/customize/mui/toast'
import WrapperAuthen from '@/customize/hook/wrapper.auth'
import WrapperQueryClient from '@/customize/hook/wrapper.queryClient'

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
      <body>
        <ThemeRegistry>
          <div className={styles.container}>
            <NextProgressBarWrapper>
              <SessionWrapper>
                <WrapperQueryClient>
                  <WrapperAuthen>{children}</WrapperAuthen>
                  <ToastContainer />
                </WrapperQueryClient>
              </SessionWrapper>
            </NextProgressBarWrapper>
          </div>
        </ThemeRegistry>
      </body>
    </html>
  )
}
