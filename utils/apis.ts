export const apiRequest = async (url: string) => {
  const resp = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)

  return resp
}
