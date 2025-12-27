import { Button, Divider, MenuItem, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadCrumbs";

export default function ChitForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, control, watch } = useForm();

  const totalAmount = watch("amount");
  const members = watch("members");

  const monthlyAmount =
    totalAmount && members ? Math.round(totalAmount / members) : "";

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Chits", href: "/dashboard/chits" },
    { label: "Add Chit" },
  ];

  const onSubmit = (data) => {
    const payload = {
      ...data,
      monthlyAmount,
    };
    console.log("Chit Data:", payload);
    navigate("../chits");
  };

  return (
    <>
      <BreadcrumbNav items={breadcrumbs} />

      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Add Chit</h2>
          <p className="text-sm text-gray-500">
            Create and manage your chit fund details
          </p>
        </div>

        <Divider />

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 grid grid-cols-1 md:grid-cols-12 gap-5"
        >
          {/* Chit Name */}
          <TextField
            label="Chit Name"
            placeholder="Gold Chit / Savings Chit"
            size="small"
            fullWidth
            className="md:col-span-6"
            {...register("name", { required: true })}
          />

          {/* Total Amount */}
          <TextField
            label="Total Amount"
            type="number"
            size="small"
            fullWidth
            className="md:col-span-3"
            {...register("amount", { required: true })}
          />

          {/* Members */}
          <TextField
            label="Total Members"
            type="number"
            size="small"
            fullWidth
            className="md:col-span-3"
            {...register("members", { required: true })}
          />

          {/* Monthly Amount (Auto) */}
          <TextField
            label="Monthly Contribution"
            size="small"
            fullWidth
            className="md:col-span-4"
            value={monthlyAmount}
            disabled
          />

          {/* Tenure */}
          <TextField
            label="Tenure (Months)"
            type="number"
            size="small"
            fullWidth
            className="md:col-span-4"
            {...register("tenure", { required: true })}
          />

          {/* Status */}
          <Controller
            name="status"
            control={control}
            defaultValue="active"
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Status"
                size="small"
                fullWidth
                className="md:col-span-4"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </TextField>
            )}
          />

          {/* Start Date */}
          <TextField
            label="Start Date"
            type="date"
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            className="md:col-span-6"
            {...register("startDate", { required: true })}
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
              onClick={() => navigate("../chits/list")}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save Chit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
1;
