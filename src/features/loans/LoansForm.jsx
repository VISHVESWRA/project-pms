import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem, Button, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadCrumbs";
import { useEffect } from "react";
import api from "../../app/axios";
import { createLoan, updateLoan } from "./LoanSlice";
import { useDispatch, useSelector } from "react-redux";

export default function LoanForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, control, reset } = useForm();

  const loan = useSelector((state) =>
    state.loans.items.find((item) => item._id === id)
  );

  useEffect(() => {
    if (isEdit && loan) {
      reset({
        ...loan,
        date: loan.date?.split("T")[0], // important for date input
      });
    }
  }, [isEdit, loan, reset]);

  // useEffect(() => {
  //   if (id) {
  //     api.get(`/loans/${id}`).then((res) => reset(res.data));
  //   }
  // }, [id]);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Loans", href: "/dashboard/loans/list" },
    { label: "Add Loan" },
  ];

  const onSubmit = (data) => {
    if (id) {
      dispatch(updateLoan({ id, data }));
    } else {
      dispatch(createLoan(data));
    }
    navigate("../loans/list");
  };

  return (
    <>
      {/* Breadcrumb */}
      <BreadcrumbNav items={breadcrumbs} />

      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Add Loan</h2>
          <p className="text-sm text-gray-500">
            Manage your loans and EMI details
          </p>
        </div>

        <Divider />

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 grid grid-cols-1 md:grid-cols-12 gap-5"
        >
          {/* Loan Name */}
          <TextField
            label="Loan Name"
            placeholder="Home Loan / Personal Loan"
            size="small"
            fullWidth
            className="md:col-span-6"
            {...register("loanName", { required: true })}
          />

          {/* Loan Type */}
          <Controller
            name="loanType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Loan Type"
                size="small"
                fullWidth
                className="md:col-span-6"
              >
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="home">Home</MenuItem>
                <MenuItem value="vehicle">Vehicle</MenuItem>
                <MenuItem value="education">Education</MenuItem>
                <MenuItem value="business">Business</MenuItem>
              </TextField>
            )}
          />

          {/* Lender */}
          <TextField
            label="Lender / Bank"
            placeholder="HDFC, SBI, ICICI"
            size="small"
            fullWidth
            className="md:col-span-6"
            {...register("lender")}
          />

          {/* Loan Amount */}
          <TextField
            label="Loan Amount"
            type="number"
            size="small"
            fullWidth
            className="md:col-span-6"
            {...register("loanAmount", { required: true })}
          />

          {/* Interest Rate */}
          <TextField
            label="Interest Rate (%)"
            type="number"
            size="small"
            fullWidth
            className="md:col-span-4"
            {...register("interestRate")}
          />

          {/* Tenure */}
          <TextField
            label="Tenure (Months)"
            type="number"
            size="small"
            fullWidth
            className="md:col-span-4"
            {...register("tenure")}
          />

          {/* EMI */}
          <TextField
            label="EMI Amount"
            type="number"
            size="small"
            fullWidth
            className="md:col-span-4"
            {...register("emiAmount", { required: true })}
          />

          {/* Start Date */}
          <TextField
            label="Start Date"
            type="date"
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            className="md:col-span-6"
            {...register("startDate")}
          />

          {/* End Date */}
          <TextField
            label="End Date"
            type="date"
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            className="md:col-span-6"
            {...register("endDate")}
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
              onClick={() => navigate("../loans/list")}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save Loan
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
