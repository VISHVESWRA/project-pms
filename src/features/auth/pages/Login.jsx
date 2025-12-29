import { useState, useEffect } from "react";
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

import api from "../../../app/axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toasts.success("Login successful!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toasts.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen min-w-screen flex">
        {/* Left Side */}
        <div
          className="hidden md:flex md:flex-col gap-2 w-1/2 items-center justify-center
                      bg-linear-to-br from-blue-700 via-purple-600 to-pink-600"
        >
          <h1 className="text-white text-3xl font-bold">PMS</h1>
        </div>

        {/* <div
          className="relative hidden md:flex w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/login-bg.png')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>

          <h1 className="relative flex justify-center w-full z-10 text-white text-4xl font-bold">
            PMS
          </h1>
        </div> */}

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-200">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
            <h2
              className="text-2xl font-semibold text-center mb-1
               bg-linear-to-r from-blue-600 via-purple-600 to-pink-500
               bg-clip-text text-transparent"
            >
              PMS
            </h2>
            <p className="text-lg text-gray-500 text-center mb-6">
              Login to your account
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
                    size="small"
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
                    size="small"
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
