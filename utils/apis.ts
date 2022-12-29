export const apiRequest = async <T>(url: string): Promise<T> => {
  const resp = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log("error", error))

  console.log("resp", resp)

  return resp
}
