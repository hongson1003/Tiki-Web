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

const Header = async () => {
  const session = await getServerSession(authOptions)
  return (
    <header className={styles.container}>
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
          <Image
            src={'/images/homepage.png'}
            width={30}
            height={30}
            alt="home icon"
          />
          <Link href={'/'}>
            <p className={styles.textHome}>Trang chủ</p>
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
            <Link href={'/auth/signin'} className={styles.textAccount}>
              Đăng nhập
            </Link>
          )}
        </div>
        {/* store component */}
        <Store />
      </div>
    </header>
  )
}

export default Header
