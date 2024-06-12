import React from 'react'
import styles from './subSidebar.module.css'

interface SubSidebarProps {
  title: string
  data: any
}

const SubSidebar = async ({ title, data }: SubSidebarProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
    </div>
  )
}

export default SubSidebar
