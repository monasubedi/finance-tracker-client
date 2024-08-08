import FinanceRecordForm from "../../components/finance-record/finance-record-form";
import FinanceRecordList from "../../components/finance-record/finance-record-list";
import Navbar from "../../components/navbar";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="finance-container">
        <FinanceRecordForm />
        <FinanceRecordList />
      </div>
    </div>
  );
};

export default Dashboard;
