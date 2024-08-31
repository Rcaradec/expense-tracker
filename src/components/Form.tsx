import React, { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const categories: string[] = ["Courses", "Utilitaire", "Loisirs"];
const tasksListBase = [
  {
    description: "Lait",
    amount: 5,
    category: "Courses",
  },
  {
    description: "Vaisselle",
    amount: 8,
    category: "Utilitaire",
  },
  {
    description: "Repassage",
    amount: 10,
    category: "Utilitaire",
  },
  {
    description: "Pétanque",
    amount: 15,
    category: "Loisirs",
  },
  {
    description: "Ping-pong",
    amount: 35,
    category: "Loisirs",
  },
  {
    description: "Paic citron",
    amount: 3,
    category: "Courses",
  },
];

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Veuillez renseigner au moins 3 caracteres" }),
  amount: z.number({ invalid_type_error: "Un montant est requis" }).min(1),
  category: z.string().min(1, { message: "Veuillez sélectionner une option" }),
});

type Task = z.infer<typeof schema>;

const Form = () => {
  const [tasksList, setTasksList] = useState<Task[]>(tasksListBase);
  const [filteredTasksList, setFilteredTasksList] = useState<Task[]>(tasksList);
  console.log("tasksList", tasksList);
  const [selectedCat, setSelectedCat] = useState<string>("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Task>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (newTask: Task) => {
    setTasksList([...tasksList, newTask]);
    console.log(tasksList);
  };

  const handleDelete = (selectedtask: Task) => {
    setTasksList(tasksList.filter((task) => task !== selectedtask));
    console.log("updated tasksList", tasksList);
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
      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Montant
          </label>
          <input
            {...register("amount", {
              valueAsNumber: true,
            })}
            id="amount"
            type="number"
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.amount?.message}</p>
          )}
        </div>
        <select
          className="form-select mb-3"
          id="category"
          aria-label="Categories Select"
          {...register("category")}
        >
          <option value="">Selectionnez une catégorie</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message} </p>
        )}
        <button className="btn btn-primary">Submit</button>
      </form>

      <select
        className="form-select mb-3"
        id="category"
        aria-label="Categories Select"
        {...register("category")}
        onChange={handleSelectChange}
      >
        <option value="">Filtrer une catégorie</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="d-flex gap-1 align-items-center">
        <p className="mb-0">Réintialiser le filtre de catégories:</p>
        <button
          className="btn border border-info btn-close"
          onClick={handleResetClick}
        ></button>
      </div>
      {selectedCat !== "" && (
        <p className="">
          La liste affiche la catégorie:{" "}
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
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Form;
//? ajouter un texte et un bouton pour pouvoir afficher a nouveau toutes les catégories.
