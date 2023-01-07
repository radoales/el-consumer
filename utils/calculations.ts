import { LowestConsumptionPrice } from "../types/price"

export const getBestTime = (
  prices: {
    time_start: number
    DKK_per_kWh: number
    EUR_per_kWh: number
    EXR: number
    time_end: string
  }[],
  usageHours: number,
  start: number,
  avoidNigthHours?: boolean,
  includeTomorrow?: boolean
): LowestConsumptionPrice | null => {
  const dataArr = includeTomorrow ? prices : prices.slice(0, 24)
  const arr = dataArr.map((price) => {
    return Number(price.DKK_per_kWh)
  })
  if (arr.length === 0 || usageHours > arr.length) return null

  let lowestSum = Number.MAX_VALUE
  let currentSum = 0
  let startIndex = 0

  for (let i = start; i < arr.length - usageHours + 1; i++) {
    currentSum = 0
    for (let j = i; j < i + usageHours; j++) {
      currentSum += arr[j]
    }

    if (currentSum < lowestSum) {
      if (!avoidNigthHours) {
        lowestSum = currentSum
        startIndex = i
      } else {
        if (i > 5 && i < 23 && i + usageHours < 23) {
          lowestSum = currentSum
          startIndex = i
        }
      }
    }
  }
  return {
    amount: lowestSum,
    startingTime: startIndex,
    consumptionHours: usageHours
  }
}
