import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function ResetPassword() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = localStorage.getItem("resetEmail");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!email || !storedUser) {
      navigate("/");
      return;
    }

    const updatedUser = {
      ...storedUser,
      password: data.password,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.removeItem("resetEmail");

    alert("Password reset successful");
    navigate("/");
  };

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
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
