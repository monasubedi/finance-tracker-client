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
  updateRecord: (id: string, record: FinanceRecord) => void;
  deleteRecord: (id: string) => void;
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
    if (!user) {
      return;
    }
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

  const deleteRecord = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3001/finance-records/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data) {
        setRecords((prev) => prev.filter((record) => record._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateRecord = async (id: string, record: FinanceRecord) => {
    try {
      const res = await fetch(`http://localhost:3001/finance-records/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(record),
      });
      const data = await res.json();
      if (data) {
        setRecords((prev) =>
          prev.map((record) => {
            if (record._id === id) {
              return data;
            } else return record;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecordsByUserId();
  }, [user]);

  return (
    <FinanceRecordContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
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
