import { InputNumber, Select } from "antd"
import { useCallback, useEffect, useState } from "react"
import { NOW } from "../../../utils/constants"
import { getPriceForTimeWindow } from "../../../utils/helpers"
import styles from "../../../styles/pricecalculator/index.module.scss"
import {
  ConsumptionPrice,
  HourPrice,
  LowestConsumptionPrice
} from "../../../types/price"
import ChartBar from "../charts/ChartBar"
import { getBestTime } from "../../../utils/calculations"
import TimePicker from "../timePicker"
import PriceSection from "../../priceSection"
import CalculatorSettings from "../../calculatorSetting"
import { DEVICES } from "../../../utils/deviceslist"
import { Device } from "../../../types/device"
import { SliderRangeProps } from "antd/es/slider"

interface PriceCalculator {
  data: HourPrice[]
}

const PriceCalculator: React.FC<PriceCalculator> = ({ data }) => {
  const [currentPrice, setCurrentPrice] = useState<ConsumptionPrice>()
  const [bestPrice, setBestPrice] = useState<ConsumptionPrice>()
  const [slider, setSlider] = useState<SliderRangeProps["value"]>([
    NOW,
    NOW + 2
  ])
  const [device, setDevice] = useState<Device>()
  const [usageHours, setUsageHours] = useState<number | null>()
  const [chartData, setChartData] = useState<any[]>()
  const [bestTime, setBestTime] = useState<
    LowestConsumptionPrice | null | undefined
  >()
  const [avoidNightHours, setAvoidNightHours] = useState(false)
  const [includeTomorrow, setincludeTomorrow] = useState(true)

  useEffect(() => {
    if (device) {
      setUsageHours(device.averageUsageHours)
    }
  }, [device])

  useEffect(() => {
    if (bestTime && slider && data) {
      setBestPrice(
        getPriceForTimeWindow(data, [
          bestTime?.startingTime ?? NOW,
          (bestTime?.startingTime ?? NOW) + (slider[1] - slider[0])
        ])
      )
      setCurrentPrice(getPriceForTimeWindow(data, slider))
      setUsageHours(slider[1] - slider[0])
    }
  }, [bestTime, data, slider])

  const handleSelectDevice = useCallback((id: number) => {
    setDevice(DEVICES.find((device) => device.id === id))
  }, [])

  useEffect(() => {
    if (device) {
      setSlider([NOW, NOW + device.averageUsageHours])
    }
  }, [device])

  useEffect(() => {
    if (data) {
      const dataArr = includeTomorrow ? data : data.slice(0, 24)
      setChartData(
        dataArr.map((item) => {
          return {
            name:
              item.time_start <= 23 ? item.time_start : item.time_start - 24,
            price: item.DKK_per_kWh.toFixed(2)
          }
        })
      )
      if (device && usageHours) {
        const bestTime = getBestTime(
          data,
          usageHours,
          NOW,
          avoidNightHours,
          includeTomorrow
        )
        setBestTime(bestTime)
      }
    }
  }, [avoidNightHours, data, device, includeTomorrow, usageHours])

  return (
    <div className={styles.priceCalculator}>
      <PriceSection
        bestPrice={bestPrice}
        currentPrice={currentPrice}
        bestTime={bestTime}
        device={device}
        currentPricePerKw={
          data.find((item) => item.time_start === NOW)?.DKK_per_kWh
        }
        lowestPrice={2}
      />

      <CalculatorSettings
        avoidNightHours={avoidNightHours}
        setAvoidNightHours={setAvoidNightHours}
        includeTomorrow={includeTomorrow}
        setincludeTomorrow={setincludeTomorrow}
      />
      <div className={styles.priceCalculator__devices}>
        <Select
          dropdownMatchSelectWidth={false}
          placeholder='Select a device'
          onChange={handleSelectDevice}
          className={styles.priceCalculator__devices__select}
          size='large'
          filterOption={(input, option) =>
            (option?.label?.toString() ?? "").toLowerCase().includes(input)
          }
        >
          {DEVICES.map((device, index) => (
            <Select.Option key={index} label={device.name} value={device.id}>
              <div className={styles.priceCalculator__devices__select__option}>
                {device.icon}
                {device.name}
              </div>
            </Select.Option>
          ))}
        </Select>
      </div>

      <TimePicker
        data={includeTomorrow ? data : data.slice(0, 24)}
        setSlider={setSlider}
        slider={slider}
      />
      <div className={styles.priceCalculator__graph}>
        {chartData && <ChartBar data={chartData} />}
      </div>
    </div>
  )
}

export default PriceCalculator
