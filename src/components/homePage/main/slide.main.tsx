'use client'
import { StrategyModel } from '@/models/strategy'
import { Box, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import './arrow.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Image from 'next/image'
import zIndex from '@mui/material/styles/zIndex'
interface SlideHomeProps {
  data: StrategyModel[]
}

const styleArrow = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-150%)',
  width: '35px',
  height: '35px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'var(--white)',
  borderRadius: '50%',
  opacity: 0,
  zIndex: 100,
  '&:hover': {
    backgroundColor: 'var(--white)',
  },
}

function NextArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <Box
      className={className}
      onClick={onClick}
      sx={{
        ...style,
        ...styleArrow,
        right: '20px',
      }}
    >
      <ArrowForwardIosIcon width={10} height={10} color="primary" />
    </Box>
  )
}

function PrevArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <Box
      className={className}
      sx={{
        ...style,
        ...styleArrow,
        left: '20px',
      }}
      onClick={onClick}
    >
      <ArrowForwardIosIcon
        width={10}
        height={10}
        color="primary"
        sx={{ transform: 'rotate(180deg)' }}
      />
    </Box>
  )
}

// Slider settings
const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
}

const SlideHome = ({ data }: SlideHomeProps) => {
  return (
    <Box
      sx={{
        height: '400px',
        width: 'calc(100vw - var(--sidebar--width) - 45px)',
        backgroundColor: 'var(--white)',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          '&:hover': {
            '& .slick-arrow': {
              opacity: 1,
            },
          },
        }}
      >
        <Slider {...settings}>
          {!null &&
            data?.map((item, index) => (
              <Box
                key={item._id}
                sx={{
                  display: 'flex !important',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  width: '100%',
                  gap: '10px',
                  cursor: 'pointer',
                }}
              >
                <Image
                  width={550}
                  height={300}
                  src={item?.image!}
                  alt={item?.description!}
                  style={{ borderRadius: '10px', marginRight: '10px' }}
                />
                <Image
                  width={550}
                  height={300}
                  src={data[index + 1]?.image! || data[0]?.image!}
                  alt={data[index + 1]?.description! || data[0]?.description!}
                  style={{ borderRadius: '10px' }}
                />
              </Box>
            ))}
        </Slider>
      </Box>
    </Box>
  )
}

export default SlideHome
