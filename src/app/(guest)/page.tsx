import MainHome from '@/components/homePage/main.home'
import Sidebar from '@/components/homePage/sidebar'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: '1.25rem',
        backgroundColor: 'var(--whisper)',
        padding: '15px',
      }}
    >
      <Sidebar />
      <MainHome />
    </Box>
  )
}
