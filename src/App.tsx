import { useState } from "react";
import ExpenseForm from "./components/ExpenseTracker/ExpenseForm";
import ExpenseList from "./components/ExpenseTracker/ExpenseList";
import ExpenseFilter from "./components/ExpenseTracker/ExpenseFilter";

export const categories = ["Groceries", "Utilities", "Entertainment"];

export interface expenseDataType {
  description: string;
  amount: number;
  category: string;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const [expense, setExpense] = useState([
    { id: 1, description: "Electricity", amount: 10, category: "Utilities" },
  ]);

  function deleteItem(id: number) {
    setExpense(expense.filter((item) => item.id !== id && item));
  }

  function categorySelect(categorie: string) {
    setSelectedCategory(categorie);
  }

  const selectedExpenses =
    selectedCategory == ""
      ? expense
      : expense.filter((data) => data.category == selectedCategory);

  const onSubmit = (data: expenseDataType) => {
    setExpense([...expense, { ...data, id: expense.length + 1 }]);
  };

  return (
    <>
      <div className="mb-5">
        <ExpenseForm shareData={onSubmit} />
      </div>
      <div className="mb-3">
        <ExpenseFilter onSelect={categorySelect} />
      </div>
      <ExpenseList
        expenses={selectedExpenses}
        onDelete={deleteItem}
      ></ExpenseList>
    </>
  );
}

export default App;
