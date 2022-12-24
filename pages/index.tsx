import { useEffect, useState } from "react"
import { useGetData } from "../hooks/data"
import { getHourPrice, getPriceForTimeWindow } from "../utils/helpers"
import styles from "../styles/home/index.module.scss"
import Input from "antd/es/input/Input"
import { Slider } from "antd"
import { SliderMarks } from "antd/es/slider"
import { NOW } from "../utils/constants"

export default function Home() {
  const { data } = useGetData()
  const [currentPrice, setCurrentPrice] = useState<number>()
  const [slider, setSlider] = useState<number[]>([NOW, NOW + 2])

  useEffect(() => {
    if (data) {
      setCurrentPrice(getPriceForTimeWindow(data, slider))
    }
  }, [data, slider])

  const marks: SliderMarks = {
    0: "0:00",
    23: "23:00",
    [Number(NOW)]: "Now"
  }

  return (
    <div className={styles.home}>
      {data && (
        <>
          <div className={styles.home__currentPriceBox}>
            <div className={styles.home__currentPriceBox__price}>
              {currentPrice?.toFixed(2)} dkk
            </div>
            <div>price for period</div>
          </div>
          <div className={styles.home__form}>
            <Slider
              marks={marks}
              tooltip={{ open: true, formatter: (value) => `${value}:00` }}
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
