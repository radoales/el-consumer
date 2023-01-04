import { Radio } from "antd"
import styles from "../../styles/calculatorsettings/index.module.scss"

interface CalculatorSettingsProps {
  avoidNightHours: boolean
  setAvoidNightHours: any
  includeTomorrow: boolean
  setincludeTomorrow: any
}

const CalculatorSettings: React.FC<CalculatorSettingsProps> = ({
  avoidNightHours,
  setAvoidNightHours,
  includeTomorrow,
  setincludeTomorrow
}) => {
  return (
    <div className={styles.calculatorSettings}>
      <div className={styles.calculatorSettings__box}>
        <span>Avoid night hours</span>
        <Radio.Group
          onChange={(e) => setAvoidNightHours(e.target.value)}
          size='large'
          value={avoidNightHours}
          buttonStyle='outline'
        >
          <Radio.Button value={true}>Yes</Radio.Button>
          <Radio.Button value={false}>No</Radio.Button>
        </Radio.Group>
      </div>
      <div className={styles.calculatorSettings__box}>
        <span>Include Tomorrow</span>
        <Radio.Group
          onChange={(e) => setincludeTomorrow(e.target.value)}
          size='large'
          value={includeTomorrow}
          buttonStyle='outline'
        >
          <Radio.Button value={true}>Yes</Radio.Button>
          <Radio.Button value={false}>No</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  )
}

export default CalculatorSettings
