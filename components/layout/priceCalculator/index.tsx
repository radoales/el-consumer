import { Select, Slider } from "antd"
import { SliderMarks } from "antd/es/slider"
import { useCallback, useEffect, useState } from "react"
import { DEVICES, NOW } from "../../../utils/constants"
import { getPriceForTimeWindow } from "../../../utils/helpers"
import styles from "../../../styles/pricecalculator/index.module.scss"
import { Device, HourPrice } from "../../../types/elpris"

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
  const [device, setDevice] = useState<Device>()

  useEffect(() => {
    if (data) {
      setCurrentPrice(getPriceForTimeWindow(data, slider))
    }
  }, [data, slider])

  const marks: SliderMarks = {
    0: "0:00",
    24: "Midnight   ",
    [Number(NOW)]: "Now"
  }

  const handleSelectDevice = useCallback((id: number) => {
    const selectedDevice = DEVICES.find((device) => device.id === id)

    setDevice(selectedDevice)
  }, [])

  return (
    <div className={styles.priceCalculator}>
      <div className={styles.priceCalculator__currentPriceBox}>
        <div className={styles.priceCalculator__currentPriceBox__price}>
          {(
            currentPrice &&
            device &&
            currentPrice?.price * device?.consumption
          )?.toFixed(2)}
        </div>
        <div>price for {currentPrice?.hours} hours</div>
      </div>
      <div className={styles.priceCalculator__devices}>
        <Select
          dropdownMatchSelectWidth={false}
          placeholder='Select a device'
          onChange={handleSelectDevice}
          className={styles.priceCalculator__devices__select}
          size='large'
          showSearch
          filterOption={(input, option) =>
            (option?.label?.toString() ?? "").toLowerCase().includes(input)
          }
        >
          {DEVICES.map((device, index) => (
            <Select.Option key={index} label={device.name} value={device.id}>
              {device.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className={styles.priceCalculator__slider}>
        <Slider
          marks={marks}
          tooltip={{
            // open: true,
            formatter: (value) =>
              value && `${value < 24 ? value : value - 24}:00`
          }}
          range={{ draggableTrack: true }}
          defaultValue={slider}
          max={48}
          onChange={(e: [number, number]) => setSlider(e)}
        />
      </div>
    </div>
  )
}

export default PriceCalculator
