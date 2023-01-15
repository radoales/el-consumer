import React from 'react'
import styles from '../../styles/pricesection/index.module.scss'
import { Device } from '../../types/device'
import {
  ConsumptionPrice,
  HourPrice,
  LowestConsumptionPrice
} from '../../types/price'
import { getPriceColor } from '../../utils/calculations'

interface PriceSectionProps {
  device?: Device
  currentPrice?: ConsumptionPrice
  bestPrice?: ConsumptionPrice
  bestTime?: LowestConsumptionPrice | null
  currentPricePerKw?: number
  lowestPrice?: HourPrice
}

const PriceSection: React.FC<PriceSectionProps> = ({
  device,
  bestPrice,
  currentPrice,
  bestTime,
  currentPricePerKw,
  lowestPrice
}) => {
  return (
    <div className={styles.priceSection}>
      {currentPrice && bestPrice ? (
        <div
          className={`${styles.priceSection__box} ${
            styles[getPriceColor(currentPrice.amount, bestPrice.amount)]
          }`}
        >
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
        currentPricePerKw &&
        lowestPrice && (
          <div
            className={`${styles.priceSection__box}  ${
              styles[getPriceColor(currentPricePerKw, lowestPrice.DKK_per_kWh)]
            }`}
          >
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
            Best time to start:{' '}
            {bestTime?.startingTime < 24
              ? `${bestTime?.startingTime}:00`
              : `${bestTime?.startingTime - 24}:00 tomorrow`}
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
                You save{' '}
                {(
                  currentPrice?.amount * device?.consumption -
                  bestPrice?.amount * device?.consumption
                ).toFixed(2)}{' '}
                dkk
              </div>
            </>
          )}
        </div>
      ) : (
        lowestPrice && (
          <div className={styles.priceSection__box}>
            <div>Lowest upcoming price </div>
            <div className={styles.priceSection__box__price}>
              {lowestPrice.DKK_per_kWh.toFixed(2)}
              <span>dkk</span>
            </div>
            <div>per kW</div>
            <div className={styles.priceSection__box__difference}>
              starts at{' '}
              {lowestPrice?.time_start < 24
                ? `${lowestPrice?.time_start}:00`
                : `${lowestPrice?.time_start - 24}:00 tomorrow`}
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default PriceSection
