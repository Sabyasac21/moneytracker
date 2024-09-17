import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComparisonLineChart from "../antdutils/ComparisonLineChart";
import { Button, Card } from "antd";
import "./status.css";
import ComparisionBar from "../antdutils/ComparisonBar";

const Status = () => {
  const [userIncome, setUserIncome] = useState([]);
  const [userExpense, setUserExpense] = useState([]);
  const [today, setToday] = useState(new Date())
  const [dateSpan, setDateSpan] = useState([])
  const { userId } = useParams();

  const fetchStatus = async () => {
    console.log(today, 'see here');
    const response = await fetch(
      `http://localhost:3001/dashboard/status/${userId}?date=${today}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (!data.success) {
      console.error("Failed to fetch the status", response.statusText);
      return;
    }
    setUserIncome(data.incomeData);
    setUserExpense(data.expenseData);
    setDateSpan(data.dateSpan)
   
  };
  const handlePrevStatus = ()=>{
    const changeDate = new Date(today)
    changeDate.setDate(today.getDate()-7)
    setToday(changeDate)
  }
  const handleNextStatus = ()=>{
    const changeDate = new Date(today)
    changeDate.setDate(today.getDate()+7)
    setToday(changeDate)
  }
  useEffect(() => {
    fetchStatus();
  }, [today]);
  const combinedData = [...userIncome, ...userExpense];

  const aggregatedData = {};

  combinedData.forEach((item) => {
    const date = new Date(item.date).toISOString().split("T")[0];
    if (!aggregatedData[date]) {
      aggregatedData[date] = { date, Income: 0, Expense: 0 };
    }
    if (item.type === "Income") {
      aggregatedData[date].Income += item.amount;
    } else if (item.type === "Expense") {
      aggregatedData[date].Expense += item.amount;
    }
  });

  const chartData = Object.values(aggregatedData).map((entry) => ({
    date: entry.date,
    Income: entry.Income || 0,
    Expense: entry.Expense || 0,
  }));
  chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

  
  return (
    <div className="status-container">
      <h2 style={{textAlign:'center'}}>{`Weekly Status from: ${dateSpan[0]} - ${dateSpan[1]}`}</h2>
      <div className="status-charts-container">
        <Card
          style={{
            width: "50%",
            height: 400,
            backgroundColor: "white",
            boxShadow: "0 4px 18px rgba(0, 0, 0, 0.2)",
            marginRight: "1rem",
            marginBottom: "1rem",
          }}
        >
          <ComparisonLineChart data={chartData} />
        </Card>
        <Card
          style={{
            width: "55%",
            height: 400,
            backgroundColor: "white",
            boxShadow: "0 4px 18px rgba(0, 0, 0, 0.2)",
            marginRight: "1rem",
            marginBottom: "1rem",
          }}
        >
          <ComparisionBar data={chartData}/>
          <div>
            <Button style={{marginRight:'4px'}} onClick={handlePrevStatus}>Prev</Button>
            <Button onClick={handleNextStatus}>Next </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Status;
