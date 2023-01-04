import { Radio, Select, Slider } from "antd"
import { SliderMarks } from "antd/es/slider"
import { useCallback, useEffect, useState } from "react"
import { DEVICES, NOW } from "../../../utils/constants"
import { getPriceForTimeWindow } from "../../../utils/helpers"
import styles from "../../../styles/pricecalculator/index.module.scss"
import { Device, HourPrice } from "../../../types/elpris"
import ChartBar from "../charts/ChartBar"
import { getBestTime } from "../../../utils/calculations"
import TimePicker from "../timePicker"

interface PriceCalculator {
  data: HourPrice[]
}

const PriceCalculator: React.FC<PriceCalculator> = ({ data }) => {
  const [currentPrice, setCurrentPrice] = useState<{
    hours: number
    price: number
  }>()
  const [bestPrice, setBestPrice] = useState<{
    hours: number
    price: number
  }>()
  const [slider, setSlider] = useState<[number, number]>([NOW, NOW + 2])
  const [device, setDevice] = useState<Device>()
  const [chartData, setChartData] = useState<any[]>()
  const [bestTime, setBestTime] = useState<{
    lowestSum: number
    startIndex: number
  } | null>()
  const [avoidNightHours, setAvoidNightHours] = useState(false)
  const [includeTomorrow, setincludeTomorrow] = useState(true)

  useEffect(() => {
    if (data) {
      setCurrentPrice(getPriceForTimeWindow(data, slider))
    }
  }, [data, slider])

  useEffect(() => {
    if (bestTime && device) {
      setBestPrice(
        getPriceForTimeWindow(data, [
          bestTime?.startIndex ?? NOW,
          (bestTime?.startIndex ?? NOW) + device.averageUsageHours
        ])
      )
    }
  }, [bestTime, data, device])

  const handleSelectDevice = useCallback((id: number) => {
    setDevice(DEVICES.find((device) => device.id === id))
  }, [])

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
      if (device) {
        const bestTime = getBestTime(
          data,
          device?.averageUsageHours,
          NOW,
          avoidNightHours,
          includeTomorrow
        )
        setBestTime(bestTime)
        setSlider([NOW, NOW + device.averageUsageHours])
      }
    }
  }, [avoidNightHours, data, device, includeTomorrow])

  return (
    <div className={styles.priceCalculator}>
      {device && (
        <div className={styles.priceCalculator__priceBoxes}>
          <div className={styles.priceCalculator__priceBoxes__currentPriceBox}>
            <div>if you start now: </div>
            <div
              className={
                styles.priceCalculator__priceBoxes__currentPriceBox__price
              }
            >
              {(
                currentPrice &&
                device &&
                currentPrice?.price * device?.consumption
              )?.toFixed(2)}
              <span>dkk</span>
            </div>
            <div>price for {currentPrice?.hours} hours</div>
          </div>
          {bestTime?.startIndex && bestTime.startIndex !== 0 ? (
            <div
              className={styles.priceCalculator__priceBoxes__currentPriceBox}
            >
              <div>
                Best time to start:{" "}
                {bestTime?.startIndex < 24
                  ? `${bestTime?.startIndex}h.`
                  : `${bestTime?.startIndex - 24}h. tomorrow`}
              </div>
              <div
                className={
                  styles.priceCalculator__priceBoxes__currentPriceBox__price
                }
              >
                {(
                  bestPrice &&
                  device &&
                  bestPrice?.price * device?.consumption
                )?.toFixed(2)}
                <span>dkk</span>
              </div>
              <div>price for {bestPrice?.hours} hours</div>
              {currentPrice?.price && bestPrice?.price && (
                <>
                  <div
                    className={
                      styles.priceCalculator__priceBoxes__currentPriceBox__difference
                    }
                  >
                    {Math.round(
                      ((currentPrice?.price * device?.consumption -
                        bestPrice?.price * device?.consumption) /
                        currentPrice?.price) *
                        100
                    )}
                    % cheaper
                  </div>
                  <div>
                    You save{" "}
                    {(
                      currentPrice?.price * device?.consumption -
                      bestPrice?.price * device?.consumption
                    ).toFixed(2)}{" "}
                    dkk
                  </div>
                </>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
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
              {device.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className={styles.priceCalculator__settings}>
        <div className={styles.priceCalculator__settings__box}>
          <span>Avoid night hours</span>
          <Radio.Group
            onChange={(e) => setAvoidNightHours(e.target.value)}
            size='large'
            value={avoidNightHours}
            buttonStyle='outline'
          >
            <Radio.Button value={true}>Yes</Radio.Button>
            <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
        </div>
        <div className={styles.priceCalculator__settings__box}>
          <span>Include Tomorrow</span>
          <Radio.Group
            onChange={(e) => setincludeTomorrow(e.target.value)}
            size='large'
            value={includeTomorrow}
            buttonStyle='outline'
          >
            <Radio.Button value={true}>Yes</Radio.Button>
            <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <TimePicker data={data} setSlider={setSlider} slider={slider} />
      <div className={styles.priceCalculator__graph}>
        {chartData && <ChartBar data={chartData} />}
      </div>
    </div>
  )
}

export default PriceCalculator
