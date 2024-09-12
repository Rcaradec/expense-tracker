import { ExpensePayload } from "./types";
import apiClient from "../services/api-client";

export const fetchExpensesList = async () => {
  const response = await apiClient.get("/expenses");
  if (response.status !== 200) {
    throw new Error("Network response on get expense was not ok");
  }
  return response.data;
};

export const fetchCategories = async () => {
  const response = await apiClient.get("/categories");
  if (response.status !== 200) {
    throw new Error("Network response on get categories was not ok");
  }
  return response.data;
};

export const createExpense = async (newExpense: ExpensePayload) => {
  const response = await apiClient.post("expenses", newExpense);
  if (response.status !== 201) {
    throw new Error("Network response on create expense was not ok");
  }
  return response.data;
};

export const fetchOneExpense = async (expenseId: number) => {
  const response = await apiClient.get("expenses/" + expenseId);
  if (response.status !== 200) {
    throw new Error("Network response on get expense was not ok");
  }
  return response.data;
};

export const deleteExpense = async (expenseId: number) => {
  const response = await apiClient.delete("expenses/" + expenseId);
  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Network response on delete expense was not ok");
  }
  return response.data;
};
export const updateExpense = async (
  expenseId: number,
  expense: ExpensePayload
) => {
  const response = await apiClient.put("expenses/" + expenseId, expense);
  if (response.status !== 200) {
    throw new Error("Network response on update expense was not ok");
  }
  return response.data;
};
