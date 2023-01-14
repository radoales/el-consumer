import Image from "next/image"
import styles from "../../styles/layout/header.module.scss"
import Navbar from "./Navbar"

const Header = () => {
  return (
    <div className={styles.header}>
      <Image src={"/logo.svg"} width={50} height={50} alt={"logo"} />
      <Navbar />
    </div>
  )
}

export default Header
