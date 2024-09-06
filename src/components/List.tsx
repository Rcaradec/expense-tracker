import React, { useEffect } from "react";
import { Category, Expense } from "../api/types";

type Props = {
  filteredExpensesList: Expense[];
  handleDelete: (expenseId: number) => void;
  selectedCat: string;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleResetClick: () => void;
  categories: Category[];
};

const List = ({
  filteredExpensesList,
  handleDelete,
  selectedCat,
  handleSelectChange,
  handleResetClick,
  categories,
}: Props) => {
  useEffect(() => {}, [filteredExpensesList]);

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
          <option key={category.id} value={category.name}>
            {category.name}
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
      <table className="table table-hover-custom">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Montant</th>
            <th scope="col">Catégorie</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpensesList?.length > 0 &&
            filteredExpensesList.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.amount}€</td>
                <td>{expense.category}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(expense.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          {filteredExpensesList?.length === 0 && (
            <tr>
              <td colSpan={4}>Aucune dépense trouvée</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>
              {" "}
              {filteredExpensesList?.length > 0 &&
                filteredExpensesList
                  .reduce((acc, expense) => expense.amount + acc, 0)
                  .toFixed(2)}
              €
            </td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default List;
