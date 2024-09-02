import React from "react";
import { Task } from "./Form";
import { categories } from "../data/tasksListData.ts";

type Props = {
  filteredTasksList: Task[];
  handleDelete: (taskToDelete: Task) => void;
  selectedCat: string;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleResetClick: () => void;
  totalPrice: number;
};

const List = ({
  filteredTasksList,
  handleDelete,
  selectedCat,
  handleSelectChange,
  handleResetClick,
  totalPrice,
}: Props) => {
  return (
    <>
      <select
        className="form-select mb-3"
        id="category"
        aria-label="Categories Select"
        onChange={handleSelectChange}
      >
        <option value="">Filtrer par catégorie</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="d-flex gap-2 align-items-center">
        <div className="d-flex my-3 gap-3">
          <p className="mb-0">Réintialiser le filtre de catégories:</p>
          <button
            className="btn border border-primary btn-close"
            onClick={handleResetClick}
          ></button>
        </div>
      </div>
      {selectedCat !== "" && (
        <p className="">
          La liste affiche la catégorie{" "}
          <strong className="text-primary">{selectedCat}</strong>
        </p>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Montant</th>
            <th scope="col">Catégorie</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasksList.map((task) => (
            <tr key={task.description}>
              <td>{task.description}</td>
              <td>{task.amount}€</td>
              <td>{task.category}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(task)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCat !== "" && (
        <p>
          Total pour {selectedCat}:{" "}
          <strong className="text-primary">{totalPrice}€</strong>
        </p>
      )}
    </>
  );
};

export default List;
