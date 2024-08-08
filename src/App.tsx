import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import { FinanceRecordProvider } from "./context/finance-record-context";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <FinanceRecordProvider>
                <Dashboard />
              </FinanceRecordProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
