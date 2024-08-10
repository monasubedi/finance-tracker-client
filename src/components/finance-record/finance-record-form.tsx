import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useFinanceContext } from "../../context/finance-record-context";

const FinanceRecordForm = () => {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const {records,addRecord } = useFinanceContext();

  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let financeRecord = {
      userId: user?.id,
      date: new Date(),
      amount: parseFloat(amount),
      description,
      category,
      paymentMethod,
    };
    await addRecord(financeRecord);
    setAmount("");
    setDescription("");
    setCategory("");
    setPaymentMethod("");
  };

  console.log("records are",records);
  

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Amount:</label>
        <input
          required
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label>Description:</label>
        <input
          required
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label>Category:</label>
        <select
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Select a Category</option>
          <option value={"food"}>Food</option>
          <option value={"utilities"}>Utilities</option>
          <option value={"rent"}>Rent</option>
          <option value={"entertainment"}>Entertainment</option>
          <option value={"other"}>Other</option>
        </select>
      </div>
      <div className="form-field">
        <label>Payment Method:</label>
        <select
          required
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select a payment method</option>
          <option value={"credit-card"}>Credit Card</option>
          <option value={"cash"}>Cash</option>
          <option value={"bank-transfer"}>Bank Transfer</option>
        </select>
      </div>
      <button type="submit">Add Record</button>
    </form>
  );
};

export default FinanceRecordForm;
