import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { HourPrice } from "../types/price"
import { apiRequest } from "../utils/apis"
import { API_URL } from "../utils/constants"

export const useGetPrices = (region: string) => {
  const today = dayjs().format("YYYY/MM-DD")
  const tomorrow = dayjs().add(1, "day").format("YYYY/MM-DD")

  return useQuery(
    ["prices", region],
    async () => {
      const todayPrices = await apiRequest<HourPrice[]>(
        `${API_URL}${today}_${region}.json`
      )

      const tomorowPrices = await apiRequest<HourPrice[]>(
        `${API_URL}${tomorrow}_${region}.json`
      )

      const allPrices = tomorowPrices
        ? [
            ...todayPrices.map((item) => {
              return {
                ...item,
                time_start: new Date(item.time_start).getHours(),
                DKK_per_kWh: Math.abs(item.DKK_per_kWh)
              }
            }),
            ...tomorowPrices.map((item) => {
              return {
                ...item,
                time_start: new Date(item.time_start).getHours() + 24,
                DKK_per_kWh: Math.abs(item.DKK_per_kWh)
              }
            })
          ]
        : todayPrices.map((item) => {
            return {
              ...item,
              time_start: new Date(item.time_start).getHours(),
              DKK_per_kWh: Math.abs(item.DKK_per_kWh)
            }
          })

      return allPrices
    },
    { refetchOnWindowFocus: false }
  )
}
