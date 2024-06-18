import { Box, Skeleton, Typography } from '@mui/material'
import ListMenu from './sidebar/list.menu'
import { getCategoriesAction } from '@/action/action'
import { CategoryModel } from '@/models/category'

const fetchCategories = async (page: number, limit: number) => {
  try {
    const res = await getCategoriesAction(limit)
    if (res?.errCode === 200) return res.data!
    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

const Sidebar = async () => {
  const data = await fetchCategories(1, 15)
  return (
    <Box
      sx={{
        borderRadius: '10px',
        backgroundColor: 'var(--white)',
        padding: '15px 20px',
        maxHeight: 'calc(100vh - var(--navbar--height) - 30px)',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 'var(--sidebar--width)',
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
      {<Skeleton variant="rectangular" width={210} height={118} /> && (
        <ListMenu data={data} />
      )}
    </Box>
  )
}

export default Sidebar
