import React from "react"
import styles from "../../styles/pricesection/index.module.scss"
import { Device } from "../../types/device"
import { ConsumptionPrice, LowestConsumptionPrice } from "../../types/price"

interface PriceSectionProps {
  device: Device
  currentPrice: ConsumptionPrice
  bestPrice: ConsumptionPrice
  bestTime: LowestConsumptionPrice
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
            currentPrice?.amount * device?.consumption
          )?.toFixed(2)}
          <span>dkk</span>
        </div>
        <div>price for {currentPrice?.consumptionHours} hours</div>
      </div>
      {bestTime?.startingTime && bestTime?.startingTime !== 0 ? (
        <div className={styles.priceSection__box}>
          <div>
            Best time to start:{" "}
            {bestTime?.startingTime < 24
              ? `${bestTime?.startingTime}h.`
              : `${bestTime?.startingTime - 24}h. tomorrow`}
          </div>
          <div className={styles.priceSection__box__price}>
            {(
              bestPrice &&
              device &&
              bestPrice?.amount * device?.consumption
            )?.toFixed(2)}
            <span>dkk</span>
          </div>
          <div>price for {bestPrice?.consumptionHours} hours</div>
          {currentPrice?.amount && bestPrice?.amount && (
            <>
              <div className={styles.priceSection__box__difference}>
                {Math.round(
                  ((currentPrice?.amount * device?.consumption -
                    bestPrice?.amount * device?.consumption) /
                    currentPrice?.amount) *
                    100
                )}
                % cheaper
              </div>
              <div>
                You save{" "}
                {(
                  currentPrice?.amount * device?.consumption -
                  bestPrice?.amount * device?.consumption
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
