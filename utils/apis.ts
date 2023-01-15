export const apiRequest = async <T>(url: string): Promise<T> => {
  const resp = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => {})

  return resp
}
