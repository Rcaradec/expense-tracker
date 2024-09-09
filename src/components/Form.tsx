import React, { Dispatch, SetStateAction, useEffect } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExpense, fetchOneExpense, updateExpense } from "../api/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category, ExpensePayload } from "../api/types";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Veuillez renseigner au moins 3 caracteres" }),
  amount: z
    .number({ invalid_type_error: "Un montant est requis" })
    .nonnegative({ message: "Pas de valeur négative" })
    .min(1),
  category: z.string().min(1, { message: "Veuillez sélectionner une option" }),
});

export type Expense = z.infer<typeof schema>;

type Props = {
  selectedCat: string;
  setSelectedCat: React.Dispatch<React.SetStateAction<string>>;
  categories: Category[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  expenseId: number | null;
};

const Form = ({ categories, isOpen, isEdit, setIsOpen, expenseId }: Props) => {
  const queryClient = useQueryClient();

  const handleClose = () => {
    setIsOpen(false);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Expense>({
    resolver: zodResolver(schema),
  });

  const { data: oneExpense } = useQuery({
    queryKey: ["fetchOneExpense", expenseId],
    queryFn: () => fetchOneExpense(expenseId!),
    enabled: !!expenseId,
  });

  useEffect(() => {
    if (isEdit && oneExpense) {
      setValue("description", oneExpense.description);
      setValue("amount", oneExpense.amount);
      setValue("category", oneExpense.category);
    }
  }, [oneExpense, isEdit, setValue]);

  const createMutation = useMutation({
    mutationKey: ["newExpense"],
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expensesData"] });
      reset();
    },
    onError: (error) => {
      console.error("Error creating expense:", error);
    },
  });

  const updateMutation = useMutation({
    mutationKey: ["updateExpense"],
    mutationFn: (updatedExpense: ExpensePayload) =>
      updateExpense(expenseId!, updatedExpense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expensesData"] });
      reset();
    },
    onError: (error) => {
      console.error("Error updating expense:", error);
    },
  });

  const onSubmit = (newExpense: ExpensePayload) => {
    if (isEdit) {
      updateMutation.mutate(newExpense);
    } else {
      createMutation.mutate(newExpense);
    }
    reset();
    setIsOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <div className="my-3">
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
            placeholder="Description"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <input
            {...register("amount", {
              valueAsNumber: true,
            })}
            id="amount"
            type="number"
            className="form-control"
            placeholder="Montant"
          />
          {errors.description && (
            <p className="text-danger">{errors.amount?.message}</p>
          )}
        </div>
        <select
          className="form-select my-5"
          id="category"
          aria-label="Categories Select"
          {...register("category")}
        >
          <option value="">Selectionnez une catégorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message} </p>
        )}
        <button className="btn btn-primary">Envoyer</button>
        {isOpen && (
          <button className="btn btn-outline-danger ms-3" onClick={handleClose}>
            Close modal
          </button>
        )}
      </form>
    </>
  );
};

export default Form;
