export interface HourPrice {
  DKK_per_kWh: number
  EUR_per_kWh: number
  EXR: number
  time_end: string
  time_start: number
}

export interface ConsumptionPrice {
  consumptionHours: number
  amount: number
}

export interface LowestConsumptionPrice extends ConsumptionPrice {
  startingTime: number
}
