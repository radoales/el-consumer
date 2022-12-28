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
  data: any[]
}

const ChartBar: React.FC<ChartBarprops> = ({ data }) => {
  console.log("data", data)

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey='price'>
          {data.map((item, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                item.price < 1
                  ? styles.color_green
                  : item.price > 1 && item.price < 2
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
