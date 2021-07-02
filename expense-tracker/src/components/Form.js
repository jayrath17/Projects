import React, { useState } from "react";
import History from "./History";

function Form() {
  const [id, setId] = useState(1);
  const [List, setL] = useState([]);
  const [text, setText] = useState("");
  const [amt, setAmt] = useState("");
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const addbtnHandler = () => {
    // console.log(text, amt);
    if (Number(amt) >= 0) {
      List.push({ id: id, text: text, amt: amt });
      setL(List);
      setId(id + 1);
      setAmt("");
      setText("");
      setIncome(income + Number(amt));
    } else if (Number(amt) < 0) {
      List.push({ id: id, text: text, amt: amt });
      setL(List);
      setId(id + 1);
      setAmt("");
      setText("");
      setExpense(expense - Number(amt));
    } else {
      setAmt("");
      setText("");
      alert("enter Valid Amount");
    }
  };
  const onformsub = (event) => {
    event.preventDefault();
  };
  return (
    <div className="container">
      <h4>Your Balance</h4>
      <h1>Rs {income - expense}</h1>

      <div className="inc-exp-container">
        <div>
          <h4>INCOME</h4>
          <p className="money plus">+ Rs {income}</p>
        </div>
        <div>
          <h4>EXPENSE</h4>
          <p className="money minus"> -Rs {expense}</p>
        </div>
      </div>
      <div>
        <h4>History</h4>
        <History List={List} />
      </div>
      <h4>Add New Transaction</h4>
      <form onSubmit={onformsub}>
        <div className="form-control">
          <label>Expense or income</label>
          <input
            type="text"
            placeholder="Expense/Income Name.."
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <div className="form-control">
          <label>Enter Amount</label>
          <input
            type="text"
            placeholder="amount.."
            onChange={(e) => setAmt(e.target.value)}
            value={amt}
          />
        </div>
        <button className="btn" type="submit" onClick={addbtnHandler}>
          {" "}
          Add New Transaction
        </button>
      </form>
    </div>
  );
}
export default Form;
