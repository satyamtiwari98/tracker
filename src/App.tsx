import { useEffect, useState } from "react";
import AddExpenseDeposit from "./components/addExpenseDeposit/AddExpenseDeposit";
import Table from "./components/table/Table";
// import data from "./utils/data.json";

function App() {
  const [add, setAdd] = useState(false);
  const [data, setData] = useState<
    Array<{
      date: string;
      description: string;
      category: string;
      amount: number;
      balance: number;
    }>
  >([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/transactions")
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  const handleAddTransaction = (newTransaction: (typeof data)[0]) => {
    setData((prevData) => [...prevData, newTransaction]);
  };

  const handleDeleteTransaction = (index: number) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-100">
      <div>
        <h1 className="text-3xl font-bold text-blue-600">Investment Tracker</h1>
      </div>
      <div>
        <div className="text-center text-gray-700">
          Track your investments, expenses, and deposits all in one place.
        </div>
        <div className="text-center text-gray-500 text-sm">
          <button className="underline" onClick={() => setAdd(!add)}>
            {add ? "Hide Form" : "Show Form"}
          </button>
        </div>
      </div>
      {add && (
        <div>
          <div className="p-4 bg-white shadow-md rounded-md">
            <AddExpenseDeposit
              onAdd={handleAddTransaction}
              currentBalance={data.length ? data[data.length - 1].balance : 0}
            />
          </div>
        </div>
      )}
      {data.length > 0 && (
        <div className="mb-6">
          <div className="p-4 bg-white shadow-md rounded-md w-full max-w-4xl">
            <Table data={data} onDelete={handleDeleteTransaction} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
