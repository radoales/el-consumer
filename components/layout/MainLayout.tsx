import { Layout } from "antd"
import Head from "next/head"
import styles from "../../styles/layout/mainlayout.module.scss"
import Footer from "./Footer"
import Header from "./Header"

interface MainLayoutProps {
  children: JSX.Element | JSX.Element[]
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className={styles.main}>
      <Head>
        <title>El Consumer</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
      {/* <Layout.Footer>
        <Footer />
      </Layout.Footer> */}
    </Layout>
  )
}

export default MainLayout
