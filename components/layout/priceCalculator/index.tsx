import { useCallback, useEffect, useState } from "react"
import { NOW, regionDenmark } from "../../../utils/constants"
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
import DeviceSelection from "../../deviceSelection"
import Denmark from "../map"
import { Col, Grid, Row } from "antd"
const { useBreakpoint } = Grid

interface PriceCalculator {
  data: HourPrice[]
  region: regionDenmark
  setRegion: (region: regionDenmark) => void
}

const PriceCalculator: React.FC<PriceCalculator> = ({
  data,
  region,
  setRegion
}) => {
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
  const [lowestprice, setLowestprice] = useState<HourPrice>()
  const screen = useBreakpoint()

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

      const dataCopy = [...data]

      const buff = dataCopy
        .filter((item) => item.time_start >= NOW)
        .sort((a, b) => a.DKK_per_kWh - b.DKK_per_kWh)[0]
      setLowestprice(buff)
    }
  }, [avoidNightHours, data, device, includeTomorrow, usageHours])

  return (
    <Row className={styles.priceCalculator}>
      {screen.md ? (
        <>
          <Col md={8} lg={4}>
            <div className={styles.priceCalculator__settings}>
              <Denmark
                selectedRegion={region}
                onChange={(value) => setRegion(value)}
              />
              <DeviceSelection handleSelectDevice={handleSelectDevice} />
              <CalculatorSettings
                avoidNightHours={avoidNightHours}
                setAvoidNightHours={setAvoidNightHours}
                includeTomorrow={includeTomorrow}
                setincludeTomorrow={setincludeTomorrow}
              />
            </div>
          </Col>
          <Col md={16} lg={20}>
            <div className={styles.priceCalculator__dataView}>
              <PriceSection
                bestPrice={bestPrice}
                currentPrice={currentPrice}
                bestTime={bestTime}
                device={device}
                currentPricePerKw={
                  data.find((item) => item.time_start === NOW)?.DKK_per_kWh
                }
                lowestPrice={lowestprice}
              />
              <TimePicker
                data={includeTomorrow ? data : data.slice(0, 24)}
                setSlider={setSlider}
                slider={slider}
              />
              <div className={styles.priceCalculator__dataView__graph}>
                {chartData && <ChartBar data={chartData} />}
              </div>
            </div>
          </Col>
        </>
      ) : (
        <Col span={24}>
          <div className={styles.priceCalculator__settings}>
            <Denmark
              selectedRegion={region}
              onChange={(value) => setRegion(value)}
            />
            <DeviceSelection handleSelectDevice={handleSelectDevice} />
            <CalculatorSettings
              avoidNightHours={avoidNightHours}
              setAvoidNightHours={setAvoidNightHours}
              includeTomorrow={includeTomorrow}
              setincludeTomorrow={setincludeTomorrow}
            />
          </div>
          <div className={styles.priceCalculator__dataView}>
            <PriceSection
              bestPrice={bestPrice}
              currentPrice={currentPrice}
              bestTime={bestTime}
              device={device}
              currentPricePerKw={
                data.find((item) => item.time_start === NOW)?.DKK_per_kWh
              }
              lowestPrice={lowestprice}
            />
            <TimePicker
              data={includeTomorrow ? data : data.slice(0, 24)}
              setSlider={setSlider}
              slider={slider}
            />
            <div className={styles.priceCalculator__dataView__graph}>
              {chartData && <ChartBar data={chartData} />}
            </div>
          </div>
        </Col>
      )}
    </Row>
  )
}

export default PriceCalculator
