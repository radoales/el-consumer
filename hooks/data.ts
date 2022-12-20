import { useEffect, useState } from "react"

export const useGetData = () => {
  const [data, setData] = useState<any[]>()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("https://www.elprisenligenu.dk/api/v1/prices/2022/12-20_DK2.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  return { data, isLoading }
}
