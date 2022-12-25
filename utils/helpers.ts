import { HourPrice } from "../types/elpris"

export const getHourPrice = (data: HourPrice[], hour: number) => {
  return data.filter((item) => item.time_start === hour)[0]
}

export const getPriceForTimeWindow = (
  data: HourPrice[],
  timeWindow: number[]
) => {
  const hourPrices = data
    .filter(
      (item) =>
        item.time_start >= timeWindow[0] && item.time_start < timeWindow[1]
    )
    .map((item) => item.DKK_per_kWh)

  return {
    hours: hourPrices.length,
    price: hourPrices.length
      ? hourPrices.reduce((prev, curr) => prev + curr)
      : 0
  }
}
