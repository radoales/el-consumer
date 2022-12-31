export const API_URL = "https://www.elprisenligenu.dk/api/v1/prices/"
export const NOW = new Date().getHours()

export enum REGIONS {
  east = "DK2",
  west = "DK1"
}

export const DEVICES = [
  {
    id: 1,
    name: "Drier",
    consumption: 0.9,
    averageUsageHours: 3
  },
  {
    id: 2,
    name: "Washing machine",
    consumption: 0.6,
    averageUsageHours: 2
  }
]
