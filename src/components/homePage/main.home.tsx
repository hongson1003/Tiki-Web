import React from 'react'
import SlideHome from './main/slide.main'
import { Box, Skeleton } from '@mui/material'
import { getSliderAction } from '@/action/action'
import Empty from '../Boxs/empty'
import FeedbackIcon from '@mui/icons-material/Feedback'
const fetchStrategies = async () => {
  try {
    const res = await getSliderAction()
    if (res && res.errCode === 200) {
      return res.data
    }
    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

const MainHome = async () => {
  const slides = await fetchStrategies()
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {slides && slides.length > 0 ? (
        <SlideHome data={slides} />
      ) : (
        <Empty
          title="Không có dữ liệu"
          description="Vui lòng thử lại sau"
          icon={
            <FeedbackIcon
              sx={{
                fontSize: 50,
                color: 'var(--primary--color)',
              }}
            />
          }
        />
      )}
    </Box>
  )
}
export default MainHome
