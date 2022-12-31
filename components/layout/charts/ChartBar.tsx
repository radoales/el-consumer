import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts"
import styles from "../../../styles/pricecalculator/index.module.scss"

interface ChartBarprops {
  data: { name: string; price: number }[]
}

const ChartBar: React.FC<ChartBarprops> = ({ data }) => {
  const max = data.map((item) => item.price)[0]
  const maxHeigth = Math.ceil(Math.max(max)) + 0.2
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis domain={[0, maxHeigth]} />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey='price'>
          {data.map((item, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                item.price < 0.7
                  ? styles.color_green
                  : item.price > 0.7 && item.price < 1
                  ? styles.color_yellow
                  : styles.color_orange
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ChartBar
