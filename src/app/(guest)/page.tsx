import Sidebar from '@/components/homePage/sidebar/sidebar'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <Box
      sx={{
        width: '100%',
        flex: 1,
        display: 'flex',
        gap: '10px',
        backgroundColor: 'var(--whisper)',
        padding: '15px 20px',
      }}
    >
      <Sidebar />
      <span>Home</span>
    </Box>
  )
}
