import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import toasts from "react-hot-toast";
import api from "../../../app/axios";

function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/forgot-password", {
        email: data.email,
      });

      toasts.success("Reset link sent. Check console/email.");
    } catch (error) {
      toasts.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your registered email
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter valid email",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              py: 1.3,
              color: "#fff",
              background: "linear-gradient(to right, #2563eb, #7c3aed)",
            }}
          >
            Continue
          </Button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
