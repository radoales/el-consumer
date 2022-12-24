import { Slider } from "antd"
import { SliderMarks } from "antd/es/slider"
import { useEffect, useState } from "react"
import { NOW } from "../../../utils/constants"
import { getPriceForTimeWindow } from "../../../utils/helpers"
import styles from "../../../styles/pricecalculator/index.module.scss"
import { HourPrice } from "../../../types/elpris"

interface PriceCalculator {
  data: HourPrice[]
  region: string
}

const PriceCalculator: React.FC<PriceCalculator> = ({ data }) => {
  const [currentPrice, setCurrentPrice] = useState<{
    hours: number
    price: number
  }>()
  const [slider, setSlider] = useState<[number, number]>([NOW, NOW + 2])

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
    <div className={styles.priceCalculator}>
      <div className={styles.priceCalculator__currentPriceBox}>
        <div className={styles.priceCalculator__currentPriceBox__price}>
          {currentPrice?.price.toFixed(2)}
        </div>
        <div>price for {currentPrice?.hours} hours</div>
      </div>
      <div className={styles.priceCalculator__form}>
        <Slider
          marks={marks}
          tooltip={{ open: true, formatter: (value) => `${value}:00` }}
          range={{ draggableTrack: true }}
          defaultValue={slider}
          max={23}
          onChange={(e: [number, number]) => setSlider(e)}
        />
      </div>
    </div>
  )
}

export default PriceCalculator
