import DenmarkEast from "../../../public/dk-EAST.svg"
import DenmarkVest from "../../../public/dk-vest.svg"
import styles from "../../../styles/map/index.module.scss"
import { regionDenmark } from "../../../utils/constants"

interface DenmarkProps {
  selectedRegion?: regionDenmark
  onChange: (value: regionDenmark) => void
  mapSize?: number
}

const Denmark: React.FC<DenmarkProps> = ({
  selectedRegion = regionDenmark.WEST,
  onChange,
  mapSize = 150
}) => {
  return (
    <div className={styles.map}>
      <div className={styles.map__label}>Change region</div>
      <div className={styles.map__inner}>
        <div
          onClick={() => onChange(regionDenmark.WEST)}
          className={`${styles.map__inner__region} ${
            selectedRegion === regionDenmark.EAST && styles.hover
          }`}
        >
          <DenmarkVest
            width={mapSize}
            height={mapSize}
            fill={
              selectedRegion === regionDenmark.WEST
                ? styles.color_green
                : styles.color_gray
            }
          />
        </div>
        <div
          className={`${styles.map__inner__region} ${
            selectedRegion === regionDenmark.WEST && styles.hover
          }`}
        >
          <DenmarkEast
            onClick={() => onChange(regionDenmark.EAST)}
            width={mapSize}
            height={mapSize}
            fill={
              selectedRegion === regionDenmark.EAST
                ? styles.color_green
                : styles.color_gray
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Denmark
