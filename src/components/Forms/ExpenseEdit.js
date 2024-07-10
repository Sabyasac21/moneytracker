import React, { useState } from "react";
import "./ExpenseEdit.css";
import { setShowExpenseForm } from "../../Redux/Slice";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const ExpenseEdit = ({ refreshData }) => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const location = useLocation()
  const Urltype = location.pathname.includes('/dashboard/income/') ? 'Income' : 'Expense';
  const [userExpenseEdit, setUserExpenseEdit] = useState({
    date: "",
    add_amt: 0,
    deduct_amt: 0,
    category: "",
    type: Urltype,
  });
  
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "deduct_amt") {
      setUserExpenseEdit((prev) => ({
        ...prev,
        [name]: -value,
      }));
    } else {
      setUserExpenseEdit((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleExpenseFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(userExpenseEdit, "userExpense");
      const { date, add_amt: amount, category, type } = userExpenseEdit;
      console.log(date, amount, category, type);
      const response = await fetch(
        `https://dailyexpense-backend.onrender.com/dashboard/add-expense/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date, amount, category, type }),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.message}`);
      }
      const data = await response.json();
      
      setUserExpenseEdit({
        date: "",
        add_amt: 0,
        deduct_amt: 0,
        category: "",
        type: Urltype
      });
    } catch (error) {
      console.error(error.message);
    }

    dispatch(setShowExpenseForm(false));
    refreshData();
  };
  return (
    <div className="expense-edit-form-cont">
      
      <div className="expense-edit-form">
        <form onSubmit={handleExpenseFormSubmit}>
          <div className="form-fields">
            <div className="date-picker">
              <label>Choose Date</label>
              <input
                required={true}
                name="date"
                value={userExpenseEdit.date}
                onChange={handleInputChange}
                type="date"
              ></input>
            </div>
            <div className="amount-section">
              <div className="add-amt">
                <label>Add Amount</label>
                <input
                  name="add_amt"
                  onChange={handleInputChange}
                  value={userExpenseEdit.add_amt}
                ></input>
              </div>
              <div className="seperator">OR</div>
              <div className="deduct-amt">
                <label>Deduct Amount</label>
                <input
                  name="deduct_amt"
                  value={userExpenseEdit.deduct_amt}
                  onChange={handleInputChange}
                ></input>
              </div>
            </div>
            <div className="category-section">
              <label>Choose Category</label>
              <input
                required={true}
                name="category"
                value={userExpenseEdit.category}
                onChange={handleInputChange}
              ></input>
            </div>
            <div style={{ display: "none" }} className="type-section">
              <label>Choose Type</label>
              <select
                name="type"
                value={userExpenseEdit.type}
                onChange={handleInputChange}
              >
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div className="submit-btn">
              <button>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseEdit;
