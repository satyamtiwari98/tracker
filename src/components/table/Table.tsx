interface Transaction {
  date: string;
  description: string;
  category: string;
  amount: number;
  balance: number;
}

interface TableProps {
  data: Transaction[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const columns = ["Date", "Description", "Category", "Amount", "Balance"];

  //   let runningBalance: number = 0;

  const totalIncome = data
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = data
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + -t.amount, 0);

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            {columns.map((col) => (
              <th className="p-4" key={col}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="text-center border-t">
              <td className="p-4">{row.date}</td>
              <td className="p-4">{row.description}</td>
              <td className="p-4">{row.category}</td>
              <td className="p-4">{row.amount}</td>
              <td className="p-4">{row.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-sm text-gray-500">
        <em>Note: Amounts in negative represent expenses.</em>
      </div>
      <div className="flex flex-col items-center mt-6 p-4 border-t">
        <h2 className="text-xl font-semibold">Summary</h2>
        <div className="mt-2">
          <p>
            Total Income: &#8377;
            {totalIncome}
          </p>
          <p>
            Total Expenses: &#8377;
            {totalExpense}
          </p>
          <p>
            Final Balance: &#8377;
            {data.length ? data[data.length - 1].balance : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Table;
