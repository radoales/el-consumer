import { useEffect, useState } from "react"
import { HourPrice } from "../types/elpris"

export const useGetData = (region: string) => {
  const [data, setData] = useState<HourPrice[]>()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(
      `https://www.elprisenligenu.dk/api/v1/prices/2022/12-20_${region}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [region])

  return { data, isLoading }
}
