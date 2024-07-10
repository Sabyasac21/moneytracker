
import { Line } from '@ant-design/charts'
import { theme } from 'antd'
import React from 'react'

const LineChart = (props) => {
    const data = props.value
    const config = {
        data, 
        theme:'dark',
        xField: 'day',
        yField: 'expense',
        point: { size: 5, shape: 'diamond' },
        
        

    }
  return (
    <div><Line {...config}/></div>
  )
}

export default LineChart