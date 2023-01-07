import React from "react"
import styles from "../../styles/pricesection/index.module.scss"
import { Device } from "../../types/device"
import { ConsumptionPrice, LowestConsumptionPrice } from "../../types/price"

interface PriceSectionProps {
  device?: Device
  currentPrice?: ConsumptionPrice
  bestPrice?: ConsumptionPrice
  bestTime?: LowestConsumptionPrice | null
  currentPricePerKw?: number
  lowestPrice?: number
}

const PriceSection: React.FC<PriceSectionProps> = ({
  device,
  bestPrice,
  currentPrice,
  bestTime,
  currentPricePerKw,
  lowestPrice
}) => {
  console.log("currentPricePerKw", currentPricePerKw)
  return (
    <div className={styles.priceSection}>
      {currentPrice ? (
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
      ) : (
        currentPricePerKw && (
          <div className={styles.priceSection__box}>
            <div>Current price </div>
            <div className={styles.priceSection__box__price}>
              {currentPricePerKw.toFixed(2)}
              <span>dkk</span>
            </div>
            <div>per kW</div>
          </div>
        )
      )}
      {device && bestTime?.startingTime && bestTime?.startingTime !== 0 ? (
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
          {currentPrice?.amount && bestPrice?.amount && device && (
            <>
              <div className={styles.priceSection__box__difference}>
                {Math.round(
                  ((currentPrice?.amount - bestPrice?.amount) /
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
        // lowestPrice && (
        //   <div className={styles.priceSection__box}>
        //     <div>Lowest price </div>
        //     <div className={styles.priceSection__box__price}>
        //       {lowestPrice.toFixed(2)}
        //       <span>dkk</span>
        //     </div>
        //     <div>per kW</div>
        //     <div className={styles.priceSection__box__difference}>
        //       starting at 7:00
        //     </div>
        //   </div>
        // )
      )}
    </div>
  )
}

export default PriceSection
