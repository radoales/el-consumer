import { DeviceCategory } from "../utils/deviceslist"

export interface Device {
  id: number
  name: string
  consumption: number
  averageUsageHours: number
  category: DeviceCategory
}
