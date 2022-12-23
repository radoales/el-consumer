import { useEffect, useState } from "react"
import { useGetData } from "../hooks/data"
import { getHourPrice, getPrice } from "../utils/helpers"
import styles from "../styles/home/index.module.scss"
import Input from "antd/es/input/Input"
import { Slider } from "antd"

export default function Home() {
  const { data } = useGetData()
  const [currentPrice, setCurrentPrice] = useState<number>()
  const [slider, setSlider] = useState<number[]>([
    new Date().getHours(),
    new Date().getHours() + 2
  ])

  useEffect(() => {
    if (data) {
      setCurrentPrice(getHourPrice(data, slider[0]).DKK_per_kWh)
      console.log("s", getPrice(data, slider))
    }
  }, [data, slider])

  return (
    <div className={styles.home}>
      {data && (
        <>
          <div className={styles.home__currentPriceBox}>
            <div className={styles.home__currentPriceBox__price}>
              {currentPrice?.toFixed(2)} dkk
            </div>
            <div>price per kw/h</div>
          </div>
          <div className={styles.home__form}>
            <Slider
              range={{ draggableTrack: true }}
              defaultValue={[slider[0], 30]}
              max={23}
              onChange={(e: number[]) => setSlider(e)}
            />
          </div>
        </>
      )}
    </div>
  )
}
