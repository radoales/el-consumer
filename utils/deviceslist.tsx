import WashingMachine from "../assets/icons/washing-machine.svg"
import Oven from "../assets/icons/oven.svg"

export const DEVICES = [
  {
    id: 1,
    name: "Drier",
    consumption: 0.9,
    averageUsageHours: 3,
    icon: <WashingMachine width={25} height={25} fill='#000' />
  },
  {
    id: 2,
    name: "Washing machine",
    consumption: 0.6,
    averageUsageHours: 2,
    icon: <WashingMachine width={25} height={25} fill='#000' />
  },
  {
    id: 3,
    name: "Oven",
    consumption: 2.5,
    averageUsageHours: 1,
    icon: <Oven width={25} height={25} fill='#000' />
  }
]
