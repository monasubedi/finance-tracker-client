const FinanceRecordForm = () => {
  return (
    <form className="form-container">
      <div className="form-field">
        <label>Name:</label>
        <input type="text" />
      </div>
      <div className="form-field">
        <label>Amount:</label>
        <input type="number" />
      </div>
      <div className="form-field">
        <label>Description:</label>
        <input type="text" />
      </div>
      <div className="form-field">
        <label>Category:</label>
        <select>
          <option>Select a Category</option>
          <option>Food</option>
          <option>Utilities</option>
          <option>Rent</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>
      </div>
      <div className="form-field">
        <label>Payment Method:</label>
        <select>
          <option>Select a payment method</option>
          <option>Credit Card</option>
          <option>Cash</option>
          <option>Bank Transfer</option>
        </select>
      </div>
      <button>Add Record</button>
    </form>
  );
};

export default FinanceRecordForm;
