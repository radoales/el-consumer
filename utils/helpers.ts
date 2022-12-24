import { HourPrice } from "../types/elpris"

export const getHourPrice = (data: HourPrice[], hour: number) => {
  return data.filter((item) => new Date(item.time_start).getHours() === hour)[0]
}

export const getPriceForTimeWindow = (
  data: HourPrice[],
  timeWindow: number[]
) => {
  const hourPrices = data
    .filter(
      (item) =>
        new Date(item.time_start).getHours() >= timeWindow[0] &&
        new Date(item.time_start).getHours() <= timeWindow[1]
    )
    .map((item) => item.DKK_per_kWh)

  return hourPrices.length ? hourPrices.reduce((prev, curr) => prev + curr) : 0
}
