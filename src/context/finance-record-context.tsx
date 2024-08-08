import React, { createContext, useContext, useState } from "react";

export interface FinanceRecord {
  _id: string;
  name: string;
  amount: number;
  description: string;
  category: string;
  paymentMethod: string;
}

interface FinanceContext {
  //   records: FinanceRecord[];
  //   addRecord: (record: FinanceRecord) => void;
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

  const updateRecord = () => {
    console.log("update record is called");
  };

  return (
    <FinanceRecordContext.Provider value={{ updateRecord }}>
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
