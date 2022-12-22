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
      {data && (
        <div className={styles.home__currentPriceBox}>
          <div className={styles.home__currentPriceBox__price}>
            {currentPrice?.toFixed(2)} dkk
          </div>
          <div>price per kw/h</div>
        </div>
      )}
    </div>
  )
}
