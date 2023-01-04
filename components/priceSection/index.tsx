import React from "react"
import styles from "../../styles/pricesection/index.module.scss"
import { Device } from "../../types/elpris"

interface Price {
  hours: number
  price: number
}

interface PriceSectionProps {
  device: Device
  currentPrice: Price
  bestPrice: Price
  bestTime: {
    lowestSum: number
    startIndex: number
  }
}

const PriceSection: React.FC<PriceSectionProps> = ({
  device,
  bestPrice,
  currentPrice,
  bestTime
}) => {
  return (
    <div className={styles.priceSection}>
      <div className={styles.priceSection__box}>
        <div>if you start now: </div>
        <div className={styles.priceSection__box__price}>
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
        <div className={styles.priceSection__box}>
          <div>
            Best time to start:{" "}
            {bestTime?.startIndex < 24
              ? `${bestTime?.startIndex}h.`
              : `${bestTime?.startIndex - 24}h. tomorrow`}
          </div>
          <div className={styles.priceSection__box__price}>
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
              <div className={styles.priceSection__box__difference}>
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
  )
}

export default PriceSection
