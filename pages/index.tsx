import { useGetPrices } from "../hooks/prices"
import styles from "../styles/home/index.module.scss"
import PriceCalculator from "../components/layout/priceCalculator"
import { useEffect, useState } from "react"
import { regionDenmark } from "../utils/constants"
import { localStorageKeys, useLocalStorage } from "../hooks/localStorage"

export default function Home() {
  const [region, setRegion] = useState<regionDenmark>()
  const { data: dataEast } = useGetPrices(regionDenmark.EAST)
  const { data: dataWest } = useGetPrices(regionDenmark.WEST)
  const [storedValue, setValue] = useLocalStorage(
    localStorageKeys.REGION,
    regionDenmark.EAST
  )

  useEffect(() => {
    if (region) {
      setValue(region)
    }
  }, [region, setValue])

  return (
    <div className={styles.home}>
      {/* {dataEast?.length && dataWest?.length && (
        <div className={styles.home__calc}>
          <PriceCalculator
            data={storedValue === regionDenmark.EAST ? dataEast : dataWest}
            region={storedValue ?? regionDenmark.WEST}
            setRegion={setRegion}
          />
        </div>
      )} */}
      Hey
    </div>
  )
}
