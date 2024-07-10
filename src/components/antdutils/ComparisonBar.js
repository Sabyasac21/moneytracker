import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

const ComparisionBar = ({data})=> {
  let cnt = 0
  const barData = []
  while (cnt<7){
    barData.push({day:days[cnt], Income:0, Expense:0 })
    cnt+=1

  }
  for (const d of data){
    const weekday = new Date(d.date).getDay()
    if (weekday===0){
      barData[-1].Income = d.Income
      barData[-1].Expense = d.Expense
    }else{
      barData[weekday-1].Income = d.Income
      barData[weekday-1].Expense = d.Expense
    }
    
  }
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={barData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Income" fill="#69DD79" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="Expense" fill="#DE0D3A" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
export default ComparisionBar;
