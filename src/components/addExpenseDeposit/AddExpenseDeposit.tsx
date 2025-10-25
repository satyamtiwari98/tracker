import { useState } from "react";

interface Transaction {
  date: string;
  description: string;
  category: string;
  amount: number;
  balance?: number;
}

const AddExpenseDeposit = ({
  onAdd,
  currentBalance,
}: {
  onAdd: (transaction: Transaction) => void;
  currentBalance: number;
}) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Negate amount for expenses
    const finalAmount = category === "Expense" && amount > 0 ? -amount : amount;
    if (!date || !description || !category || amount === 0) return;

    // Compute the new balance
    const newBalance = currentBalance + finalAmount;

    const newTransaction: Transaction = {
      date,
      description,
      category,
      amount: finalAmount,
      balance: newBalance,
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      const savedTransaction = await res.json();
      onAdd(savedTransaction); // update parent state

      // Reset form
      setDate("");
      setDescription("");
      setCategory("");
      setAmount(0);
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
          <option value="Deposit">Deposit</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Add Entry
      </button>
    </form>
  );
};

export default AddExpenseDeposit;
