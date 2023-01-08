import WashingMachine from "../assets/icons/washing-machine.svg"
import Oven from "../assets/icons/oven.svg"
import Stove from "../assets/icons/stove.svg"
import Dishwasher from "../assets/icons/dishwasher.svg"
import Kitchen from "../assets/icons/kitchen.svg"
import Bathroom from "../assets/icons/bathroom.svg"
import Refrigerator from "../assets/icons/refrigerator.svg"
import { NOW } from "./constants"

export enum DeviceCategory {
  KITCHEN = "kitchen",
  BATHROOM = "bathroom"
}

export const DEVICE_CATEGORIES = [
  {
    name: DeviceCategory.KITCHEN,
    icon: <Kitchen width={25} height={25} fill='#000' />
  },
  {
    name: DeviceCategory.BATHROOM,
    icon: <Bathroom width={25} height={25} fill='#000' />
  }
]

export const DEVICES = [
  {
    id: 1,
    name: "Dryer",
    consumption: 0.9,
    averageUsageHours: 3,
    category: DeviceCategory.BATHROOM,
    icon: <WashingMachine width={40} height={40} fill='#000' />
  },
  {
    id: 2,
    name: "Washing machine",
    consumption: 0.6,
    averageUsageHours: 2,
    category: DeviceCategory.BATHROOM,
    icon: <WashingMachine width={40} height={40} fill='#000' />
  },
  {
    id: 3,
    name: "Oven",
    consumption: 2.5,
    averageUsageHours: 1,
    category: DeviceCategory.KITCHEN,
    icon: <Oven width={40} height={40} fill='#000' />
  },
  {
    id: 4,
    name: "Stove",
    consumption: 1.5,
    averageUsageHours: 1,
    category: DeviceCategory.KITCHEN,
    icon: <Stove width={40} height={40} fill='#000' />
  },
  {
    id: 5,
    name: "Dishwasher",
    consumption: 1.3,
    averageUsageHours: 2,
    category: DeviceCategory.KITCHEN,
    icon: <Dishwasher width={40} height={40} fill='#000' />
  },
  {
    id: 6,
    name: "Refrigerator",
    consumption: 0.15,
    averageUsageHours: 24 - NOW,
    category: DeviceCategory.KITCHEN,
    icon: <Refrigerator width={40} height={40} fill='#000' />
  }
]
