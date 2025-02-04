import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { categories } from "../../App";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "This field must be at least 3 characters." }),
  amount: z
    .number({ invalid_type_error: "This field is required." })
    .min(1, { message: "Amount must be at least $1." }),
  category: z.string().min(1, { message: "This field is required." }),
});

type expenseDataType = z.infer<typeof schema>;

interface Props {
  shareData: (data: expenseDataType) => void;
}

const ExpenseForm = ({ shareData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<expenseDataType>({ resolver: zodResolver(schema) });

  const onSubmit = (data: expenseDataType) => {
    shareData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        {errors.description?.type === "required" && (
          <p className="text-danger">The description field is required.</p>
        )}
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select {...register("category")} id="category" className="form-select">
          <option value=""></option>
          {categories.map((data) => (
            <option key={data} value={data}>
              {data}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
