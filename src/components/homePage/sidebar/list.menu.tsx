'use client'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { CategoryModel } from '@/models/category'
import { useQuery } from 'react-query'
import { getCategoriesAction } from '@/action/action'
import InfiniteScroll from 'react-infinite-scroll-component'
import CircularProgress from '@mui/material/CircularProgress'

interface ListMenuProps {
  data: {
    categories: CategoryModel[]
    total: number
  } | null
}

const ListMenu = ({ data }: ListMenuProps) => {
  const [limit, setLimit] = React.useState(15)

  const fetchCategories = async (limit: number) => {
    try {
      const res = await getCategoriesAction(limit)
      if (res && res.errCode === 200) return res.data
      return null
    } catch (error) {
      console.log(error)
      return null
    }
  }

  const getMoreData = () => {
    setLimit((prev) => prev + 15)
  }

  const { data: categoriesData, isFetching } = useQuery(
    ['categories', limit],
    async () => {
      return await fetchCategories(limit)
    },
    {
      initialData: data,
    }
  )

  return (
    <Box
      id="scrollableDiv"
      sx={{
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        flex: 1,
      }}
    >
      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        dataLength={20}
        next={getMoreData}
        hasMore={true}
        loader={isFetching && <CircularProgress size={'15px'} />}
        scrollThreshold={0.7}
      >
        {categoriesData?.categories?.map((item) => (
          <Box
            key={item._id}
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
            <Image src={item?.icon!} alt={item?.alt!} width={28} height={28} />
            <Typography
              component="p"
              sx={{
                marginLeft: '10px',
              }}
            >
              {item?.title!}
            </Typography>
          </Box>
        ))}
      </InfiniteScroll>
    </Box>
  )
}

export default ListMenu
