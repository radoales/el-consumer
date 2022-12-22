import { useEffect, useState } from "react"
import { useGetData } from "../hooks/data"
import { getCurrentHourPrice } from "../utils/helpers"
import styles from "../styles/home/index.module.scss"

export default function Home() {
  const { data } = useGetData()
  const [currentPrice, setCurrentPrice] = useState<number>()

  useEffect(() => {
    if (data) {
      setCurrentPrice(getCurrentHourPrice(data).DKK_per_kWh)
    }
  }, [data])

  console.log("data", data)

  return (
    <div className={styles.home}>
      <div className={styles.home__currentPrice}>
        {data && <div>{currentPrice?.toFixed(2)}dkk</div>}
      </div>
    </div>
  )
}
