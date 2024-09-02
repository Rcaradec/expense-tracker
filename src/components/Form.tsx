import React from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Veuillez renseigner au moins 3 caracteres" }),
  amount: z.number({ invalid_type_error: "Un montant est requis" }).min(1),
  category: z.string().min(1, { message: "Veuillez sélectionner une option" }),
});

export type Task = z.infer<typeof schema>;

type Props = {
  tasksList: Task[];
  setTasksList: React.Dispatch<React.SetStateAction<Task[]>>;
  setFilteredTasksList: React.Dispatch<React.SetStateAction<Task[]>>;
  selectedCat: string;
  setSelectedCat: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
};

const Form = ({
  tasksList,
  setTasksList,
  setFilteredTasksList,

  categories,
}: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Task>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (newTask: Task) => {
    setTasksList([...tasksList, newTask]);
    setFilteredTasksList([...tasksList, newTask]);
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
        <button className="btn btn-primary">Envoyer</button>
      </form>
    </>
  );
};

export default Form;
