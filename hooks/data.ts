import { useQuery } from "@tanstack/react-query"
import { HourPrice } from "../types/elpris"
import { apiRequest } from "../utils/apis"
import { API_URL } from "../utils/constants"

export const useGetPrices = (region: string) => {
  const today = new Date()
  let tomorrow = new Date()
  return useQuery(
    ["prices", region],
    async () => {
      const todayPrices = await apiRequest<HourPrice[]>(
        `${API_URL}${today.getFullYear()}/${
          today.getMonth() + 1
        }-${today.getDate()}_${region}.json`
      )

      const tomorowPrices = await apiRequest<HourPrice[]>(
        `${API_URL}${tomorrow.getFullYear()}/${
          tomorrow.getMonth() + 1
        }-${tomorrow.getDate()}_${region}.json`
      )

      const allPrices = [
        ...todayPrices.map((item) => {
          return {
            ...item,
            time_start: new Date(item.time_start).getHours(),
            DKK_per_kWh: Math.abs(item.DKK_per_kWh * 5)
          }
        }),
        ...tomorowPrices.map((item) => {
          return {
            ...item,
            time_start: new Date(item.time_start).getHours() + 24,
            DKK_per_kWh: Math.abs(item.DKK_per_kWh * 5)
          }
        })
      ]

      return allPrices
    },
    {}
  )
}
