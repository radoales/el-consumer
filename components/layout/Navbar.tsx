import { Drawer, Menu, Grid } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { routes } from '../../utils/routes'
import styles from '../../styles/layout/header.module.scss'
import Image from 'next/image'
import MenuIcon from '../../assets/icons/menu.svg'
const { useBreakpoint } = Grid

interface NavbarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

const Navbar: React.FC<NavbarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const router = useRouter()
  const screen = useBreakpoint()
  const { pathname } = router
  const [selectedRoute, setSelectedRoute] = useState<string>('')

  useEffect(() => {
    const route = pathname.split('/')
    setSelectedRoute(route.length > 0 ? route[1] : '')
  }, [pathname])

  const handleRedirect = (key: string) => {
    router.push({
      pathname: key
    })
    !isCollapsed && setIsCollapsed(true)
  }

  return screen.lg ? (
    <Menu
      mode='horizontal'
      defaultSelectedKeys={['/']}
      items={routes}
      selectedKeys={[selectedRoute]}
      onClick={(item) => handleRedirect(item.key)}
    />
  ) : (
    <>
      <div
        className={`${styles.header__menuIcon} ${
          !isCollapsed && styles.rotate
        }`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <MenuIcon width={40} height={40} fill={styles.color_black} />
      </div>

      <Drawer
        onClose={() => setIsCollapsed(true)}
        open={!isCollapsed}
        closable={false}
        placement='top'
        height={'30vh'}
        rootClassName={styles.mobileDrawer}
      >
        <>
          <div className={`${styles.header__mobile}`}>
            <Menu
              className={`${styles.header__mobile__menu}`}
              mode='inline'
              items={routes}
              inlineCollapsed={isCollapsed}
              onClick={(item) => handleRedirect(item.key)}
            />
          </div>
        </>
      </Drawer>
    </>
  )
}

export default Navbar
