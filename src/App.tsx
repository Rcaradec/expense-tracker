import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";
import { fetchExpensesList, fetchCategories } from "./api/queries";
import { useQuery } from "@tanstack/react-query";
import { Category, Expense } from "./api/types";

const App: React.FC = () => {
  const {
    data: expenses,
    error: expensesError,
    isLoading: expensesIsLoading,
  } = useQuery<Expense[]>({
    queryKey: ["expensesData"],
    queryFn: fetchExpensesList,
  });

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesIsLoading,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const [expensesList, setExpensesList] = useState<Expense[]>(expenses || []);
  const [filteredExpensesList, setFilteredExpensesList] =
    useState<Expense[]>(expensesList);
  const [selectedCat, setSelectedCat] = useState<string>("");

  useEffect(() => {
    if (expenses) {
      setExpensesList(expenses);
      setFilteredExpensesList(expenses);
    }
  }, [expenses]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setSelectedCat(selectedCategory);
    if (selectedCategory === "") {
      setFilteredExpensesList(expensesList);
    } else {
      setFilteredExpensesList(
        expensesList.filter(
          (task: Expense) => task.category === selectedCategory
        )
      );
    }
  };

  const handleResetClick = () => {
    console.log("Refaire le reset");
    setSelectedCat("");
  };

  const handleDelete = () => {
    console.log("refaire le delete");
  };

  if (expensesIsLoading) return <div>Fetching tasks...</div>;
  if (expensesError)
    return <div>An error occurred: {expensesError.message}</div>;
  if (categoriesIsLoading) return <div>Fetching categories...</div>;
  if (categoriesError)
    return <div>An error occurred: {categoriesError.message}</div>;

  return (
    <>
      <h1 className="text-primary">Gestionnaire de dépenses</h1>
      <Form
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
        categories={categoriesData || []}
      />
      <List
        expensesList={expensesList}
        handleDelete={handleDelete}
        handleSelectChange={handleSelectChange}
        handleResetClick={handleResetClick}
        selectedCat={selectedCat}
        categories={categoriesData || []}
        filteredExpensesList={filteredExpensesList}
      />
    </>
  );
};

export default App;
