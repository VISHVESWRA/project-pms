import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem, Button, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addIncome, resetIncomeState } from "./IncomeSlice";
import { updateIncome } from "./IncomeService";

export default function IncomeForm() {
  const { register, handleSubmit, control, reset } = useForm();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { loading, success, error } = useSelector((state) => state.income);

  const income = useSelector((state) =>
    state.income.list.find((item) => item._id === id)
  );

  useEffect(() => {
    if (isEdit && income) {
      reset({
        ...income,
        date: income.date?.split("T")[0], // important for date input
      });
    }
  }, [isEdit, income, reset]);

  useEffect(() => {
    if (success) {
      dispatch(resetIncomeState());
      navigator("../income/list");
    }
  }, [success, dispatch, navigator]);

  const setBreadcrumb = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "List",
      href: "../income/list",
    },
    {
      label: "Income Form",
    },
  ];

  const onSubmit = (formData) => {
    if (id) {
      dispatch(updateIncome({ id: income._id, data: formData }));
    } else {
      dispatch(addIncome(formData));
    }
  };

  return (
    <>
      <BreadcrumbNav items={setBreadcrumb} />
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Add Income</h2>
          <p className="text-sm text-gray-500">
            Track your income sources accurately
          </p>
        </div>

        <Divider />

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 grid grid-cols-1 md:grid-cols-12 gap-5"
        >
          {/* Income Source */}
          <TextField
            label="Income Source"
            placeholder="Salary / Freelancing / Business"
            size="small"
            fullWidth
            className="md:col-span-6"
            {...register("sourceName", { required: true })}
          />

          {/* Category (TEXT) */}
          <TextField
            label="Category"
            placeholder="Job, Online, Investment"
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

          {/* Frequency */}
          <Controller
            name="frequency"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Frequency"
                size="small"
                fullWidth
                className="md:col-span-4"
              >
                <MenuItem value="one-time">One Time</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </TextField>
            )}
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
                <MenuItem value="bank">Bank Transfer</MenuItem>
              </TextField>
            )}
          />

          {/* Income Type */}
          <Controller
            name="type"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Income Type"
                size="small"
                fullWidth
                className="md:col-span-6"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="passive">Passive</MenuItem>
              </TextField>
            )}
          />

          {/* Date */}
          <TextField
            label="Date Received"
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
              onClick={() => navigator("../income/list")}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={loading}>
              {/* {loading ? "Saving..." : "Save"} */}

              {isEdit ? "Update" : "Save"}
            </Button>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
}
