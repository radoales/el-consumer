import { Menu } from "antd"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { routes } from "../../utils/routes"

const Navbar = () => {
  const router = useRouter()
  const { pathname } = router
  const [selectedRoute, setSelectedRoute] = useState<string>("")

  useEffect(() => {
    const route = pathname.split("/")
    setSelectedRoute(route.length > 0 ? route[1] : "")
  }, [pathname])

  const handleRedirect = (key: string) => {
    router.push({
      pathname: key
    })
  }

  return (
    <div>
      <Menu
        mode='horizontal'
        defaultSelectedKeys={["home"]}
        items={routes}
        selectedKeys={[selectedRoute]}
        onClick={(item) => handleRedirect(item.key)}
      />
    </div>
  )
}

export default Navbar
