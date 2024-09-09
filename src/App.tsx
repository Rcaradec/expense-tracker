import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";
import {
  fetchExpensesList,
  fetchCategories,
  deleteExpense,
} from "./api/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category, Expense } from "./api/types";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const App: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: expensesData } = useQuery<Expense[]>({
    queryKey: ["expensesData"],
    queryFn: fetchExpensesList,
  });

  const { data: categoriesData } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const [filteredExpensesList, setFilteredExpensesList] = useState<Expense[]>(
    []
  );
  const [selectedCat, setSelectedCat] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [expenseId, setExpenseId] = useState<number | null>(null);

  useEffect(() => {
    if (expensesData) {
      setFilteredExpensesList(expensesData);
    }
  }, [expensesData]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setSelectedCat(selectedCategory);

    if (!expensesData) return;

    if (selectedCategory === "") {
      setFilteredExpensesList(expensesData);
    } else {
      const filteredExpenses = expensesData.filter(
        (expense) => expense.category === selectedCategory
      );
      setFilteredExpensesList(filteredExpenses);
    }
  };

  const handleResetClick = () => {
    setSelectedCat("");
    if (expensesData) setFilteredExpensesList(expensesData);
  };

  const mutation = useMutation({
    mutationKey: ["deleteExpense"],
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expensesData"] });
    },
    onError: (error) => {
      console.error("Error deleting expense:", error);
    },
  });

  const handleDelete = (expenseId: number) => {
    mutation.mutate(expenseId, {
      onSuccess: () => {
        setFilteredExpensesList((prevList) =>
          prevList.filter((expense) => expense.id !== expenseId)
        );
      },
    });
  };
  const handleUpdate = (expenseId: number) => {
    console.log("update expense id:", expenseId);
    setIsOpen(true);
    setExpenseId(expenseId);
  };

  return (
    <>
      <h1 className="text-primary mb-5">Gestionnaire de dépenses</h1>
      <Form
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
        categories={categoriesData || []}
        isEdit={false}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        expenseId={expenseId}
      />
      <List
        handleDelete={handleDelete}
        handleSelectChange={handleSelectChange}
        handleResetClick={handleResetClick}
        selectedCat={selectedCat}
        categories={categoriesData || []}
        filteredExpensesList={filteredExpensesList}
        handleUpdate={handleUpdate}
      />
      {isOpen && (
        <ReactModal isOpen={true}>
          <Form
            expenseId={expenseId}
            selectedCat={selectedCat}
            setSelectedCat={setSelectedCat}
            categories={categoriesData || []}
            isEdit={true}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </ReactModal>
      )}
    </>
  );
};

export default App;
