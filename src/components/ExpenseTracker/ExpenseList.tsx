interface ExpenseData {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenses: ExpenseData[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  if (!expenses.length) return;
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>${expense.amount}</td>
            <td>{expense.category}</td>
            <td>
              <button
                onClick={() => {
                  onDelete(expense.id);
                }}
                className="btn btn-outline-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td>Total</td>
          <td>
            $
            {expenses.reduce((acc, expense) => Number(expense.amount) + acc, 0)}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default ExpenseList;
