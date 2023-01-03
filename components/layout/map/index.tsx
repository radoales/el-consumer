import DenmarkEast from "../../../public/dk-east.svg"
import DenmarkVest from "../../../public/dk-vest.svg"
import styles from "../../../styles/map/index.module.scss"
import { REGIONS } from "../../../utils/constants"

interface DenmarkProps {
  selectedRegion?: REGIONS
  onChange: (value: REGIONS) => void
}

const Denmark: React.FC<DenmarkProps> = ({
  selectedRegion = REGIONS.west,
  onChange
}) => {
  return (
    <div className={styles.map}>
      <div
        onClick={() => onChange(REGIONS.west)}
        className={`${styles.map__region} ${
          selectedRegion === REGIONS.east && styles.hover
        }`}
      >
        <DenmarkVest
          width={300}
          height={300}
          fill={
            selectedRegion === REGIONS.west
              ? styles.color_green
              : styles.color_gray
          }
        />
      </div>
      <div
        className={`${styles.map__region} ${
          selectedRegion === REGIONS.west && styles.hover
        }`}
      >
        <DenmarkEast
          onClick={() => onChange(REGIONS.east)}
          width={300}
          height={300}
          fill={
            selectedRegion === REGIONS.east
              ? styles.color_green
              : styles.color_gray
          }
        />
      </div>
    </div>
  )
}

export default Denmark
