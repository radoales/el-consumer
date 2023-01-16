import Image from 'next/image'
import { useState } from 'react'
import styles from '../../styles/layout/header.module.scss'
import Navbar from './Navbar'

const Header = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)

  return (
    <div className={styles.header}>
      <Image priority src={'/logo.svg'} width={50} height={50} alt={'logo'} />
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
    </div>
  )
}

export default Header
