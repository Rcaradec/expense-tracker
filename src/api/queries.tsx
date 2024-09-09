import axios from "axios";
import { ExpensePayload } from "./types";

const baseUrl: string = "http://localhost:5000/api/";

export const fetchExpensesList = async () => {
  const response = await axios.get(baseUrl + "expenses");
  if (response.status !== 200) {
    throw new Error("Network response on get expense was not ok");
  }
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(baseUrl + "categories");
  if (response.status !== 200) {
    throw new Error("Network response on get categories was not ok");
  }
  return response.data;
};

export const createExpense = async (newExpense: ExpensePayload) => {
  const response = await axios.post(baseUrl + "expenses", newExpense);
  if (response.status !== 201) {
    throw new Error("Network response on create expense was not ok");
  }
  return response.data;
};

export const fetchOneExpense = async (expenseId: number) => {
  const response = await axios.get(baseUrl + "expenses/" + expenseId);
  if (response.status !== 200) {
    throw new Error("Network response on get expense was not ok");
  }
  return response.data;
};

export const deleteExpense = async (expenseId: number) => {
  const response = await axios.delete(baseUrl + "expenses/" + expenseId);
  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Network response on delete expense was not ok");
  }
  return response.data;
};
export const updateExpense = async (
  expenseId: number,
  expense: ExpensePayload
) => {
  const response = await axios.put(baseUrl + "expenses/" + expenseId, expense);
  if (response.status !== 200) {
    throw new Error("Network response on update expense was not ok");
  }
  return response.data;
};
