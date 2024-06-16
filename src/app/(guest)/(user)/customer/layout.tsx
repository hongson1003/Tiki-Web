import Sidebar from '@/components/accountInfor/sidebar'
import { Box } from '@mui/material'
import type { Metadata } from 'next'
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        padding: '5px 10px',
        backgroundColor: 'var(--whisper)',
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            padding: '10px 20px',
          }}
        >
          <Sidebar />
          {children}
        </Box>
      </Box>
      <Box>
        <span>Footer</span>
      </Box>
    </Box>
  )
}
