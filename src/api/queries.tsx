import axios from "axios";
import { ExpensePayload } from "./types";

export const fetchExpensesList = async () => {
  const response = await axios.get("http://localhost:5000/api/tasks");
  if (response.status !== 200) {
    throw new Error("Network response on get expense was not ok");
  }
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get("http://localhost:5000/api/categories");
  if (response.status !== 200) {
    throw new Error("Network response on get categories was not ok");
  }
  return response.data;
};

export const createExpense = async (newTask: ExpensePayload) => {
  const response = await axios.post("http://localhost:5000/api/tasks", newTask);
  if (response.status !== 201) {
    throw new Error("Network response on create expense was not ok");
  }
  return response.data;
};
