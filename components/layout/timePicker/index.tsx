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
  const marks: SliderMarks = {
    0: `00:00`,
    23: data.length <= 24 && "23:00",
    24: data.length > 24 && {
      style: {
        color: "#f50"
      },
      label: <strong>Midnight</strong>
    },
    47: "23:00",
    [Number(NOW)]: "Now"
  }

  return (
    <div className={styles.timePicker}>
      <Slider
        trackStyle={[{ backgroundColor: styles.color_green }]}
        marks={marks}
        tooltip={{
          placement: "top",
          open: true,
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
