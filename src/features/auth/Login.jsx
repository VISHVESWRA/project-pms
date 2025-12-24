import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toasts from "react-hot-toast";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const DUMMY_USER = {
    email: "admin@gmail.com",
    password: "admin123",
  };

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);

    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (
        storedUser &&
        data.email === storedUser.email &&
        data.password === storedUser.password
      ) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
      } else if (data.email !== DUMMY_USER.email) {
        toasts.error("User not found. Please register.");
      } else if (data.password !== DUMMY_USER.password) {
        toasts.error("Invalid password.");
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* Left Side */}
        <div
          className="hidden md:flex md:flex-col gap-2 w-1/2 items-center justify-center
                      bg-linear-to-br from-blue-600 via-purple-600 to-pink-500"
        >
          <h1 className="text-white text-3xl font-bold">Welcome Back</h1>

          <img
            src="/src/assets/neinus.jpg"
            alt="Login"
            className="w-3/4 drop-shadow-xl"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-200">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
            <h2
              className="text-2xl font-semibold text-center mb-1
               bg-linear-to-r from-blue-600 to-purple-600
               bg-clip-text text-transparent"
            >
              Login
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Please enter your credentials
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
                    message: "Enter a valid email",
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
                    margin="normal"
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

              {/* Forgot Password */}
              <div className="text-right mt-1">
                <Link href="/forgot-password" underline="hover" variant="body2">
                  Forgot password?
                </Link>
              </div>

              {/* Login Button with Loader */}
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.3,
                  color: "#fff",
                  background: "linear-gradient(to right, #2563eb, #7c3aed)",
                  "&:hover": {
                    background: "linear-gradient(to right, #1d4ed8, #6d28d9)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>

              {/* Register */}
              <p className="text-center text-sm mt-4">
                Don’t have an account?{" "}
                <Link href="/register" underline="hover">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
