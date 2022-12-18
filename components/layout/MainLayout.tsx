import { Layout } from "antd"
import styles from "../../styles/layout/mainlayout.module.scss"
import Footer from "./Footer"
import Header from "./Header"

interface MainLayoutProps {
  children: JSX.Element | JSX.Element[]
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className={styles.main}>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  )
}

export default MainLayout
