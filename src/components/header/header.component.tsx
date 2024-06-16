import React from 'react'
import styles from './header.module.css'
import Image from 'next/image'
import InputSearch from './inputSearch/inputSearch'
import Store from './cart/cart'
import Link from 'next/link'
import AccountPopover from './account/account.popover'
import Avatar from '../user/avatar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/(authorize)/api/auth/[...nextauth]/route'
import { Box } from '@mui/material'

const Header = async () => {
  const session = await getServerSession(authOptions)
  return (
    <header className={styles.container}>
      <div className={styles.mainTop}>
        <div className={styles.logoGroup}>
          <Link href={'/'}>
            <Image
              src={'/images/logo.png'}
              width={100}
              height={50}
              alt="logo"
              priority={true}
            />
          </Link>
          <p className={styles.message}>Tốt & nhanh</p>
        </div>
        <InputSearch />
        <div className={styles.ultilsMenu}>
          <div className={styles.home}>
            <Link href={'/'}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Image
                  src={'/images/homepage.png'}
                  width={30}
                  height={30}
                  alt="home icon"
                />
                <p className={styles.textHome}>Trang chủ</p>
              </Box>
            </Link>
          </div>
          <div className={styles.account}>
            {session ? (
              <>
                <AccountPopover>
                  <Avatar src={session?.user?.image!} />
                </AccountPopover>
              </>
            ) : (
              <Link href={'/auth/signIn'} className={styles.textAccount}>
                Đăng nhập
              </Link>
            )}
          </div>
          <Store />
        </div>
      </div>
      <div className={styles.mainBottom}>
        <Image
          src="/images/homePage/box.png"
          alt="Logo"
          width={90}
          height={20}
        />
        &nbsp;
        <p className={styles.headerTitle}>đổi ý & miễn phí trả hàng</p>
        <Image
          src="/images/homePage/right-arrow.png"
          alt="Arrow"
          width={12}
          height={12}
          className={styles.arrow}
        />
      </div>
    </header>
  )
}

export default Header
