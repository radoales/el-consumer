import { useGetData } from "../hooks/data"
import styles from "../styles/home/index.module.scss"
import PriceCalculator from "../components/layout/priceCalculator"
import { Radio } from "antd"
import { useState } from "react"

export default function Home() {
  const [region, setRegion] = useState<string>("DK2")
  const { data } = useGetData(region)
  console.log("data", data)

  return (
    <div className={styles.home}>
      {data && (
        <div className={styles.home__calc}>
          <Radio.Group
            onChange={(e) => setRegion(e.target.value)}
            size='large'
            defaultValue='DK2'
            buttonStyle='outline'
          >
            <Radio.Button value='DK2'>West</Radio.Button>
            <Radio.Button value='DK1'>East</Radio.Button>
          </Radio.Group>
          <PriceCalculator data={data} region={region} />
        </div>
      )}
    </div>
  )
}
