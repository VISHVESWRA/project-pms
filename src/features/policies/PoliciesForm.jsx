import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem, Button, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadCrumbs";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../app/axios";
import { addPolicy, updatePolicy } from "./PolicySlice";

const POLICY_TYPES = [
  { value: "life", label: "Life" },
  { value: "health", label: "Health" },
  { value: "vehicle", label: "Vehicle" },
  { value: "term", label: "Term" },
  { value: "other", label: "Other" },
];

const FREQUENCIES = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
];

const STATUSES = [
  { value: "active", label: "Active" },
  { value: "expired", label: "Expired" },
];

const FilePreview = ({ fileUrl, isNewFile }) => {
  if (!fileUrl) return null;

  const isPdf =
    fileUrl.toLowerCase().includes(".pdf") ||
    fileUrl.includes("application/pdf") ||
    fileUrl.includes("/raw/upload/");

  return (
    <div className="mt-3 space-y-2">
      {isPdf ? (
        <div className="border rounded p-4 bg-gray-50">
          {isNewFile ? (
            // Local file preview using blob URL
            <iframe
              src={fileUrl}
              className="w-full h-96 border rounded bg-white"
              title="PDF Preview"
            />
          ) : (
            // Cloudinary PDF - show thumbnail and download/view buttons
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center h-48 bg-gray-100 rounded">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto text-red-500 mb-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-gray-600 font-medium">
                    PDF Document
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Click below to view or download
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  View PDF
                </a>
                <a
                  href={fileUrl}
                  download
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded hover:bg-gray-700 transition"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </a>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="border rounded p-2 bg-gray-50">
          <img
            src={fileUrl}
            alt="Document Preview"
            className="w-full max-h-96 object-contain rounded"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+";
            }}
          />
        </div>
      )}
    </div>
  );
};

export default function PolicyForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, control, reset } = useForm();

  const [loading, setLoading] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [existingFileUrl, setExistingFileUrl] = useState(null);

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!id) return;

    const fetchPolicy = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/policies/${id}`);
        const policyData = res.data;

        // Reset form with policy data
        reset(policyData);

        // Set existing file URL if present
        if (policyData.appliedDocument) {
          // Construct full Cloudinary URL if it's a relative path
          const fileUrl = policyData.appliedDocument.startsWith("http")
            ? policyData.appliedDocument
            : `https://res.cloudinary.com/${policyData.appliedDocument}`;

          setExistingFileUrl(fileUrl);
        }
      } catch (error) {
        console.error("Failed to fetch policy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [id, reset]);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Policies", href: "/dashboard/policies/list" },
    { label: isEditMode ? "Edit Policy" : "Add Policy" },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilePreview(URL.createObjectURL(file));
      setExistingFileUrl(null);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "appliedDocument" && value?.[0]) {
        formData.append("document", value[0]);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const action = isEditMode
      ? updatePolicy({ id, data: formData })
      : addPolicy(formData);

    dispatch(action);
    navigate("../policies/list");
  };

  const handleCancel = () => {
    navigate("../policies/list");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const displayFileUrl = filePreview || existingFileUrl;

  return (
    <>
      <BreadcrumbNav items={breadcrumbs} />

      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEditMode ? "Edit Policy" : "Add Policy"}
          </h2>
          <p className="text-sm text-gray-500">
            {isEditMode
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
                {POLICY_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
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
                {FREQUENCIES.map((freq) => (
                  <MenuItem key={freq.value} value={freq.value}>
                    {freq.label}
                  </MenuItem>
                ))}
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
                {STATUSES.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Applied Document (PDF / Image)
            </label>

            <input
              type="file"
              accept="application/pdf,image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              {...register("appliedDocument")}
              onChange={handleFileChange}
            />

            {isEditMode && !filePreview && (
              <p className="text-xs text-gray-500 mt-1">
                Uploading a new file will replace the existing document
              </p>
            )}

            <FilePreview
              fileUrl={displayFileUrl}
              isNewFile={Boolean(filePreview)}
            />
          </div>

          {/* Actions */}
          <div className="md:col-span-12 flex justify-end gap-3 pt-4">
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              {isEditMode ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
