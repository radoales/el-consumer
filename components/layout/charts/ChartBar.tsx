import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts"
import styles from "../../../styles/pricecalculator/index.module.scss"

interface ChartBarprops {
  data: { name: string; price: number }[]
}

const ChartBar: React.FC<ChartBarprops> = ({ data }) => {
  const prices = data.map((item) => Number(item.price))
  const maxHeigth = Math.ceil(Math.max(...prices))
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis domain={[0, maxHeigth]} />
        <Tooltip />
        <Bar dataKey='price'>
          {data.map((item, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                item.price < maxHeigth * 0.33
                  ? styles.color_green
                  : item.price > maxHeigth * 0.33 &&
                    item.price < maxHeigth * 0.66
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
