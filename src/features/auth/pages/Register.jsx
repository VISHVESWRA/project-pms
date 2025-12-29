import { useForm, Controller, useWatch } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import toasts from "react-hot-toast";
import api from "../../../app/axios";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const password = useWatch({ control, name: "password" });

  // const onSubmit = (data) => {
  //   const existingUser = JSON.parse(localStorage.getItem("user"));

  //   if (existingUser?.email === data.email) {
  //     toasts.error("User already exists. Please login.");
  //     return;
  //   }

  //   localStorage.setItem("user", JSON.stringify(data));
  //   toasts.success("Registration successful! Please login.");
  //   reset();
  //   navigate("/");
  // };

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/register", {
        email: data.email,
        password: data.password,
      });

      toasts.success("Registration successful! Please login.");
      navigate("/");
    } catch (error) {
      toasts.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-1">Register</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Create your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
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
                size="small"
                margin="dense"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          {/* Password */}
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
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                size="small"
                margin="dense"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                size="small"
                margin="dense"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
            Register
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

export default Register;
