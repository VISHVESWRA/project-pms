import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem, Button, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadCrumbs";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../app/axios";
import { addPolicy, updatePolicy } from "./PolicySlice";

export default function PolicyForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, control, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api
        .get(`https://project-pms-backend.onrender.com/api/policies/${id}`)
        .then((res) => {
          reset(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id, reset]);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Policies", href: "/dashboard/policies/list" },
    { label: "Add Policy" },
  ];

  if (loading) return <p>Loading...</p>;

  const onSubmit = (data) => {
    console.log(data);

    const formData = new FormData();

    // append normal fields
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    // append file
    if (file) {
      formData.append("document", file);
    }

    if (id) {
      dispatch(updatePolicy({ id, data: formData }));
    } else {
      dispatch(addPolicy(formData));
    }

    navigate("../policies/list");
  };

  return (
    <>
      {/* Breadcrumb */}
      <BreadcrumbNav items={breadcrumbs} />

      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {id ? "Edit Policy" : "Add Policy"}
          </h2>
          <p className="text-sm text-gray-500">
            {id
              ? "Update your policy details"
              : "Store and manage your insurance policies securely"}
          </p>
        </div>

        <Divider />

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 grid grid-cols-1 md:grid-cols-12 gap-5"
        >
          {/* Policy Name */}
          <TextField
            label="Policy Name"
            placeholder="Life Insurance / Health Cover"
            size="small"
            fullWidth
            className="md:col-span-6"
            {...register("policyName", { required: true })}
          />

          {/* Policy Type */}
          <Controller
            name="policyType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Policy Type"
                size="small"
                fullWidth
                className="md:col-span-6"
              >
                <MenuItem value="life">Life</MenuItem>
                <MenuItem value="health">Health</MenuItem>
                <MenuItem value="vehicle">Vehicle</MenuItem>
                <MenuItem value="term">Term</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            )}
          />

          {/* Provider */}
          <TextField
            label="Provider"
            placeholder="LIC, HDFC, ICICI"
            size="small"
            fullWidth
            className="md:col-span-6"
            {...register("provider")}
          />

          {/* Policy Number */}
          <TextField
            label="Policy Number"
            placeholder="Enter policy number"
            size="small"
            fullWidth
            className="md:col-span-6"
            {...register("policyNumber")}
          />

          {/* Premium Amount */}
          <TextField
            label="Premium Amount"
            type="number"
            size="small"
            fullWidth
            className="md:col-span-4"
            {...register("premiumAmount", { required: true })}
          />

          {/* Premium Frequency */}
          <Controller
            name="frequency"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Premium Frequency"
                size="small"
                fullWidth
                className="md:col-span-4"
              >
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </TextField>
            )}
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
                <MenuItem value="expired">Expired</MenuItem>
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

          {/* Nominee */}
          <TextField
            label="Nominee"
            placeholder="Nominee Name"
            size="small"
            fullWidth
            className="md:col-span-6"
            {...register("nominee")}
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

          {/* Applied Document */}
          <div className="md:col-span-12">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Applied Document (PDF / Image)
            </label>

            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100"
            />
            {id && (
              <p className="text-xs text-gray-500 mt-1">
                Uploading a new file will replace the existing document
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="md:col-span-12 flex justify-end gap-3 pt-4">
            <Button
              variant="outlined"
              onClick={() => navigate("../policies/list")}
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
