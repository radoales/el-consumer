import { useEffect, useState } from "react"
import { HourPrice } from "../types/elpris"
import { API_URL } from "../utils/constants"

export const useGetData = (region: string) => {
  const [data, setData] = useState<HourPrice[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)

    fetch(
      `${API_URL}${today.getFullYear()}/${
        today.getMonth() + 1
      }-${today.getDate()}_${region}.json`
    )
      .then((response) => response.json())
      .then((data: HourPrice[]) => {
        const parsedData = data.map((item) => {
          return { ...item, time_start: new Date(item.time_start).getHours() }
        })
        setData(parsedData)
        setLoading(false)
      })
      .then(() =>
        fetch(
          `${API_URL}${tomorrow.getFullYear()}/${
            tomorrow.getMonth() + 1
          }-${tomorrow.getDate()}_${region}.json`
        )
          .then((response) => response.json())
          .then((data: HourPrice[]) => {
            const parsedData = data.map((item) => {
              return {
                ...item,
                time_start: new Date(item.time_start).getHours() + 24
              }
            })
            setData((prev) => [...prev, ...parsedData])
            setLoading(false)
          })
      )
  }, [region])

  return { data, isLoading }
}
