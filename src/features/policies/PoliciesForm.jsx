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
  const [filePreview, setFilePreview] = useState(null);
  const [existingFile, setExistingFile] = useState(null);
  const isPdf = filePreview?.endsWith(".pdf");

  useEffect(() => {
    if (id) {
      setLoading(true);
      api
        .get(`/policies/${id}`)
        .then((res) => {
          reset(res.data);

          if (res.data.appliedDocument) {
            setExistingFile(res.data.appliedDocument);
          }

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

  const getFileUrl = (path) => {
    if (!path) return null;
    console.log("path", path);

    return `https://project-pms-backend.onrender.com/${encodeURI(path)}`;
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "appliedDocument") {
        if (data.appliedDocument?.[0]) {
          formData.append("document", data.appliedDocument[0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    });

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
              accept="application/pdf,image/*"
              {...register("appliedDocument")}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFilePreview(URL.createObjectURL(file));
                  setExistingFile(null);
                }
              }}
            />

            <pre>{filePreview}</pre>
            <pre>{existingFile}</pre>
            <pre>{isPdf}</pre>
            {/* FILE PREVIEW */}
            {filePreview && (
              <div className="mt-3">
                {filePreview.includes("pdf") ? (
                  <iframe src={filePreview} className="w-full h-64 border" />
                ) : (
                  <img src={filePreview} className="max-h-64 border" />
                )}
              </div>
            )}

            <iframe
              src={existingFile}
              width="100%"
              height="400px"
              style={{ border: "1px solid #ccc" }}
              title="PDF Preview"
            />

            {isPdf ? (
              <iframe
                src={existingFile}
                width="100%"
                height="400px"
                style={{ border: "1px solid #ccc" }}
                title="PDF Preview"
              />
            ) : (
              <img
                src={existingFile}
                alt="Preview"
                className="w-full max-h-[500px] object-contain"
              />
            )}

            {existingFile && (
              <a
                href={existingFile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Preview / Download Document
              </a>
            )}
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
