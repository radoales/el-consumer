import { useGetPrices } from "../hooks/data"
import styles from "../styles/home/index.module.scss"
import PriceCalculator from "../components/layout/priceCalculator"
import { Radio } from "antd"
import { useState } from "react"
import { REGIONS } from "../utils/constants"

export default function Home() {
  const [region, setRegion] = useState<string>(REGIONS.east)
  const { data: dataEast } = useGetPrices(REGIONS.east)
  const { data: dataWest } = useGetPrices(REGIONS.west)

  return (
    <div className={styles.home}>
      {dataEast?.length && dataWest?.length && (
        <div className={styles.home__calc}>
          <Radio.Group
            onChange={(e) => setRegion(e.target.value)}
            size='large'
            value={region}
            buttonStyle='outline'
          >
            <Radio.Button value={REGIONS.west}>West</Radio.Button>
            <Radio.Button value={REGIONS.east}>East</Radio.Button>
          </Radio.Group>
          <PriceCalculator
            data={region === REGIONS.east ? dataEast : dataWest}
          />
        </div>
      )}
    </div>
  )
}
