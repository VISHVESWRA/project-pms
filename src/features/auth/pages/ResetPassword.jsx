import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSearchParams } from "react-router-dom";
import toasts from "react-hot-toast";
import api from "../../../app/axios";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/reset-password", {
        token,
        password: data.password,
      });

      toasts.success("Password reset successful");
      navigate("/");
    } catch (error) {
      toasts.error(error.response?.data?.message || "Reset failed");
    }
  };

  if (!token) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
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
            Reset Password
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

export default ResetPassword;
