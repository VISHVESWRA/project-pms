import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem, Button, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadCrumbs";
import { useDispatch } from "react-redux";
import { addExpense, updateExpense } from "./ExpenseSlice";
import { useEffect, useState } from "react";
import api from "../../app/axios";

export default function ExpenseForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, reset } = useForm();

  const setBreadcrumb = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "List",
      href: "../expenses/list",
    },
    {
      label: "Expense Form",
    },
  ];

  // If editing, fetch the expense data
  useEffect(() => {
    if (id) {
      setLoading(true);
      api
        .get(`https://project-pms-backend.onrender.com/api/expenses/${id}`)
        .then((res) => {
          reset(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id, reset]);

  const onSubmit = (data) => {
    if (id) {
      // Update existing expense
      dispatch(updateExpense({ id, data }));
    } else {
      // Add new expense
      dispatch(addExpense(data));
    }
    navigate("../expenses/list");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <BreadcrumbNav items={setBreadcrumb} />
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {" "}
            {id ? "Edit Expense" : "Add Expense"}
          </h2>
          <p className="text-sm text-gray-500">
            {id
              ? "Update your expense details"
              : "Track your expenses accurately"}
          </p>
        </div>

        <Divider />

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 grid grid-cols-1 md:grid-cols-12 gap-5"
        >
          {/* Expense Name */}
          <TextField
            label="Expense Name"
            placeholder="Food / Rent / Electricity"
            size="small"
            fullWidth
            className="md:col-span-6"
            {...register("expenseName", { required: true })}
          />

          {/* Category */}
          <TextField
            label="Category"
            placeholder="Utilities, Travel, Groceries"
            size="small"
            fullWidth
            className="md:col-span-6"
            {...register("category")}
          />

          {/* Amount */}
          <TextField
            label="Amount"
            type="number"
            size="small"
            fullWidth
            className="md:col-span-4"
            {...register("amount", { required: true })}
          />

          {/* Payment Mode */}
          <Controller
            name="paymentMode"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Payment Mode"
                size="small"
                fullWidth
                className="md:col-span-4"
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="upi">UPI</MenuItem>
                <MenuItem value="bank">Bank</MenuItem>
                <MenuItem value="card">Card</MenuItem>
              </TextField>
            )}
          />

          {/* Expense Type */}
          <Controller
            name="type"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Expense Type"
                size="small"
                fullWidth
                className="md:col-span-4"
              >
                <MenuItem value="essential">Essential</MenuItem>
                <MenuItem value="non-essential">Non Essential</MenuItem>
                <MenuItem value="recurring">Recurring</MenuItem>
              </TextField>
            )}
          />

          {/* Date */}
          <TextField
            label="Expense Date"
            type="date"
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            className="md:col-span-6"
            {...register("date")}
          />

          {/* Notes */}
          <TextField
            label="Notes"
            multiline
            rows={3}
            size="small"
            fullWidth
            className="md:col-span-12"
            {...register("notes")}
          />

          {/* Actions */}
          <div className="md:col-span-12 flex justify-end gap-3 pt-4">
            <Button
              variant="outlined"
              onClick={() => navigate("../expenses/list")}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              {id ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
