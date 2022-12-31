export interface HourPrice {
  DKK_per_kWh: number
  EUR_per_kWh: number
  EXR: number
  time_end: string
  time_start: number
}

export interface Device {
  id: number
  name: string
  consumption: number
  averageUsageHours: number
}
