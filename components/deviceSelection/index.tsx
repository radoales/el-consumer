import { Select } from "antd"
import { DEVICES, DEVICE_CATEGORIES } from "../../utils/deviceslist"
import styles from "../../styles/deviceSelection/index.module.scss"
import { capitalize } from "../../utils/text"
import { Device } from "../../types/device"

interface DeviceSelectionProps {
  handleSelectDevice: (id: number) => void
  selectedDeviceId?: number
}

const DeviceSelection: React.FC<DeviceSelectionProps> = ({
  handleSelectDevice,
  selectedDeviceId
}) => {
  const options = DEVICE_CATEGORIES.map((category) => {
    return {
      label: category,
      options: DEVICES.filter((item) => item.category === category.name)
    }
  })

  return (
    <div className={styles.deviceSelection}>
      <div className={styles.deviceSelection__label}>Select a device</div>
      <Select
        aria-label='Select a device'
        aria-labelledby='Select a device'
        dropdownMatchSelectWidth={true}
        placeholder='Select a device'
        onChange={handleSelectDevice}
        value={selectedDeviceId}
        className={styles.deviceSelection__select}
        size='large'
        filterOption={(input, option: any) =>
          (option?.title?.toString() ?? "").toLowerCase().includes(input)
        }
        options={options.map((device) => ({
          label: (
            <div className={styles.deviceSelection__select__label}>
              {device.label.icon}
              <span>{capitalize(device.label.name)}</span>
            </div>
          ),
          options: device.options.map((device) => {
            return {
              label: (
                <div className={styles.deviceSelection__select__option}>
                  {device.icon}
                  <div className={styles.info}>
                    <div className={styles.info__name}>{device.name}</div>
                    <div className={styles.info__consumption}>
                      {device.consumption}Kw/h
                    </div>
                  </div>
                </div>
              ),
              value: device.id,
              title: device.name
            }
          })
        }))}
      />
    </div>
  )
}

export default DeviceSelection
