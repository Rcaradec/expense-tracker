import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { tasksListBase, categories } from "./data/tasksListData.ts";
import { Task } from "./components/Form.tsx";
import List from "./components/List.tsx";

const App: React.FC = () => {
  const [tasksList, setTasksList] = useState<Task[]>(tasksListBase);
  const [filteredTasksList, setFilteredTasksList] = useState<Task[]>(tasksList);
  const [selectedCat, setSelectedCat] = useState<string>("");

  const handleDelete = (taskToDelete: Task) => {
    const updatedTasksList = tasksList.filter(
      (task) => task.description !== taskToDelete.description
    );
    setTasksList(updatedTasksList);
    setFilteredTasksList(updatedTasksList);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setSelectedCat(selectedCategory);
    if (selectedCategory === "") {
      setFilteredTasksList(tasksList);
    } else {
      setFilteredTasksList(
        tasksList.filter((task) => task.category === selectedCategory)
      );
    }
  };

  const handleResetClick = () => {
    setFilteredTasksList(tasksList);
    setSelectedCat("");
  };

  return (
    <>
      <h1 className="text-primary">Gestionnaire de dépenses</h1>
      <Form
        tasksList={tasksList}
        setTasksList={setTasksList}
        setFilteredTasksList={setFilteredTasksList}
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
        categories={categories}
      />
      <List
        filteredTasksList={filteredTasksList}
        handleDelete={handleDelete}
        handleSelectChange={handleSelectChange}
        handleResetClick={handleResetClick}
        selectedCat={selectedCat}
      />
    </>
  );
};

export default App;
