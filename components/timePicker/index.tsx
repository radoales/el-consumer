import { Grid, Slider } from 'antd'
import { SliderMarks, SliderRangeProps } from 'antd/es/slider'
import styles from '../../styles/timepicker/index.module.scss'
import { HourPrice } from '../../types/price'
import { NOW } from '../../utils/constants'

const { useBreakpoint } = Grid

interface TimePickerProps {
  slider: SliderRangeProps['value']
  setSlider: (value: SliderRangeProps['value']) => void
  data: HourPrice[]
  vertical?: boolean
}

const TimePicker: React.FC<TimePickerProps> = ({
  slider,
  setSlider,
  data,
  vertical
}) => {
  const screen = useBreakpoint()
  const marks: SliderMarks = {}
  for (let i = 0; i < data.length; i += screen.xl ? 1 : screen.md ? 2 : 3) {
    marks[i] = {
      label: (
        <div className={styles.label}>
          {i === NOW ? 'Now' : `${i < 24 ? i : i - 24}:00`}
        </div>
      )
    }
  }

  return (
    <div className={`${styles.timePicker} ${styles.height}`}>
      <Slider
        vertical={vertical}
        trackStyle={[{ backgroundColor: styles.color_green }]}
        marks={marks}
        tooltip={{
          placement: 'top',
          formatter: (value) => value && `${value < 24 ? value : value - 24}:00`
        }}
        range={{ draggableTrack: true }}
        value={slider}
        max={data.length - 1}
        onChange={(e: SliderRangeProps['value']) => setSlider(e)}
      />
    </div>
  )
}

export default TimePicker
