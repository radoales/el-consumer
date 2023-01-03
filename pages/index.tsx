import { useGetPrices } from "../hooks/prices"
import styles from "../styles/home/index.module.scss"
import PriceCalculator from "../components/layout/priceCalculator"
import { useState } from "react"
import { REGIONS } from "../utils/constants"
import Denmark from "../components/layout/map"

export default function Home() {
  const [region, setRegion] = useState<REGIONS>(REGIONS.east)
  const { data: dataEast } = useGetPrices(REGIONS.east)
  const { data: dataWest } = useGetPrices(REGIONS.west)

  return (
    <div className={styles.home}>
      <Denmark selectedRegion={region} onChange={(value) => setRegion(value)} />
      {dataEast?.length && dataWest?.length && (
        <div className={styles.home__calc}>
          <PriceCalculator
            data={region === REGIONS.east ? dataEast : dataWest}
          />
        </div>
      )}
    </div>
  )
}
