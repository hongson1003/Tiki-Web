import { Box, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'

export const menu = [
  {
    title: 'Nhà sách Tiki',
    icon: '/images/homePage/categories/book.png',
    alt: 'icon sách',
  },
  {
    title: 'Dụng cụ nhà bếp',
    icon: '/images/homePage/categories/dung-cu-nha-bep.png',
    alt: 'icon dụng cụ nhà bếp',
  },
  {
    title: 'Điện thoại - Máy tính bảng',
    icon: '/images/homePage/categories/dien-thoai-may-tinh-bang.png',
    alt: 'icon điện thoại - máy tính bảng',
  },
  {
    title: 'Đồ chơi - Mẹ & Bé',
    icon: '/images/homePage/categories/do-choi-me-va-be.png',
    alt: 'icon đồ chơi - mẹ & bé',
  },
  {
    title: 'Thiết bị số - Phụ kiện số',
    icon: '/images/homePage/categories/thiet-bi-so-phu-kien-so.png',
    alt: 'icon thiết bị số - phụ kiện số',
  },
  {
    title: 'Điện gia dụng',
    icon: '/images/homePage/categories/dien-gia-dung.png',
    alt: 'icon điện gia dụng',
  },
  {
    title: 'Làm đẹp - Sức khỏe',
    icon: '/images/homePage/categories/lam-dep-suc-khoe.jpg',
    alt: 'icon làm đẹp - sức khỏe',
  },
  {
    title: 'Oto - Xe máy - Xe đạp',
    icon: '/images/homePage/categories/oto-xe-may.png',
    alt: 'icon oto - xe máy - xe đạp',
  },
  {
    title: 'Thời trang nữ',
    icon: '/images/homePage/categories/thoi-trang-nu.png',
    alt: 'icon thời trang nữ',
  },
  {
    title: 'Bách hóa online',
    icon: '/images/homePage/categories/bach-hoa-online.png',
    alt: 'icon bách hóa online',
  },
  {
    title: 'Thể thao - Dã ngoại',
    icon: '/images/homePage/categories/the-thao-da-ngoai.jpg',
    alt: 'icon thể thao - dã ngoại',
  },
  {
    title: 'Thời trang nam',
    icon: '/images/homePage/categories/thoi-trang-nam.png',
    alt: 'icon thời trang nam',
  },
  {
    title: 'Lap top - Máy vi tính',
    icon: '/images/homePage/categories/lap-top-may-vi-tinh.png',
    alt: 'icon laptop - máy vi tính',
  },
  {
    title: 'Giày dép nam',
    icon: '/images/homePage/categories/giay-dep-nam.jpg',
    alt: 'Giày dép nam',
  },
  {
    title: 'Điện tử - Điện lạnh',
    icon: '/images/homePage/categories/dien-tu-dien-lanh.png',
    alt: 'icon điện tử - điện lạnh',
  },
  {
    title: 'Giày dép nữ',
    icon: '/images/homePage/categories/giay-dep-nu.png',
    alt: 'icon giày dép nữ',
  },
  {
    title: 'Máy ảnh - Máy quay phim',
    icon: '/images/homePage/categories/may-anh-may-quay-phim.png',
    alt: 'icon máy ảnh - máy quay phim',
  },
  {
    title: 'Phụ kiện - Thời trang',
    icon: '/images/homePage/categories/phu-kien-thoi-trang.png',
    alt: 'icon phụ kiện - Thời trang',
  },
  {
    title: 'Đồng hồ - Trang sức',
    icon: '/images/homePage/categories/dong-ho-trang-suc.png',
    alt: 'icon đồng hồ - trang sức',
  },
  {
    title: 'Balo - Túi xách - Ví',
    icon: '/images/homePage/categories/balo-tui-xach-vi.png',
    alt: 'icon balo - túi xách - ví',
  },
]

const Sidebar = () => {
  return (
    <Box
      sx={{
        borderRadius: '10px',
        backgroundColor: 'var(--white)',
        padding: '15px',
      }}
    >
      <Typography
        component="p"
        sx={{
          padding: ' 5px 10px',
          fontWeight: 'bold',
        }}
      >
        Danh mục
      </Typography>
      <Box>
        {menu.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #f0f0f0',
              ':hover': {
                backgroundColor: 'var(--light--gray)',
                cursor: 'pointer',
                borderRadius: '10px',
              },
            }}
          >
            <Image src={item.icon} alt={item.alt} width={28} height={28} />
            <Typography
              component="p"
              sx={{
                marginLeft: '10px',
              }}
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Sidebar
