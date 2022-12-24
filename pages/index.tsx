import { useGetData } from "../hooks/data"
import styles from "../styles/home/index.module.scss"
import PriceCalculator from "../components/layout/priceCalculator"

export default function Home() {
  const { data } = useGetData()

  return (
    <div className={styles.home}>{data && <PriceCalculator data={data} />}</div>
  )
}
