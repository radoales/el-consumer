import { useGetPrices } from "../hooks/prices"
import styles from "../styles/home/index.module.scss"
import PriceCalculator from "../components/layout/priceCalculator"
import { useState } from "react"
import { regionDenmark } from "../utils/constants"
import Denmark from "../components/layout/map"

export default function Home() {
  const [region, setRegion] = useState<regionDenmark>(regionDenmark.EAST)
  const { data: dataEast } = useGetPrices(regionDenmark.EAST)
  const { data: dataWest } = useGetPrices(regionDenmark.WEST)

  return (
    <div className={styles.home}>
      {dataEast?.length && dataWest?.length && (
        <div className={styles.home__calc}>
          <PriceCalculator
            data={region === regionDenmark.EAST ? dataEast : dataWest}
            region={region}
            setRegion={setRegion}
          />
        </div>
      )}
    </div>
  )
}
