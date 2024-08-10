import { useUser } from "@clerk/clerk-react";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface FinanceRecord {
  _id?: string;
  date: Date;
  amount: number;
  description: string;
  category: string;
  paymentMethod: string;
}

interface FinanceContext {
  records: FinanceRecord[];
  addRecord: (record: FinanceRecord) => void;
  updateRecord: () => void;
  //   deleteRecord: (id: string) => void;
}

export const FinanceRecordContext = createContext<FinanceContext | undefined>(
  undefined
);

export const FinanceRecordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinanceRecord[]>([]);
  const { user } = useUser();

  const fetchRecordsByUserId = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/finance-records/getAllByUserID/${user?.id}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data) {
        setRecords(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addRecord = async (newRecord: FinanceRecord) => {
    try {
      const res = await fetch("http://localhost:3001/finance-records", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newRecord),
      });
      const data = await res.json();
      if (data) {
        setRecords((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateRecord = () => {
    console.log("update record is called");
  };

  useEffect(() => {
    fetchRecordsByUserId();
  }, []);

  return (
    <FinanceRecordContext.Provider value={{ records, addRecord, updateRecord }}>
      {children}
    </FinanceRecordContext.Provider>
  );
};

export const useFinanceContext = () => {
  const context = useContext(FinanceRecordContext);
  if (!context) {
    throw new Error("It must be a Finance Context Provider");
  }
  return context;
};
