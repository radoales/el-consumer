import { HourPrice } from "../types/elpris"

export const getCurrentHourPrice = (data: HourPrice[]) => {
  return data.filter(
    (item) => new Date(item.time_start).getHours() === new Date().getHours()
  )[0]
}
