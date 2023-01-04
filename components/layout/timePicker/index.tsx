import { Slider } from "antd"
import { SliderMarks } from "antd/es/slider"
import styles from "../../../styles/timepicker/index.module.scss"
import { HourPrice } from "../../../types/elpris"
import { NOW } from "../../../utils/constants"

interface TimePickerProps {
  slider: [number, number]
  setSlider: (value: [number, number]) => void
  data: HourPrice[]
}

const TimePicker: React.FC<TimePickerProps> = ({ slider, setSlider, data }) => {
  const s: any = {}
  for (let i = 0; i < 48; i++) {
    s[i] = {
      label: (
        <div className={styles.label}>
          {i === NOW ? "Now" : `${i < 24 ? i : i - 24}:00`}
        </div>
      )
    }
  }

  return (
    <div className={styles.timePicker}>
      <Slider
        trackStyle={[{ backgroundColor: styles.color_green }]}
        marks={s}
        tooltip={{
          placement: "top",
          formatter: (value) => value && `${value < 24 ? value : value - 24}:00`
        }}
        range={{ draggableTrack: true }}
        value={slider}
        max={data.length - 1}
        onChange={(e: [number, number]) => setSlider(e)}
      />
    </div>
  )
}

export default TimePicker
