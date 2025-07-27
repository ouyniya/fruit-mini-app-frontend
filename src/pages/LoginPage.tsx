import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import MessageBox from "../components/common/MessageBox";
import { authService } from "../services/authService";
import { loginSchema } from "../utils/validation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Loader2 } from "lucide-react";
import axios from "axios";

const LoginPage: React.FC = () => {
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const navigate = useNavigate();

  // validate when user types
  const validateOnChange = (field: "email" | "password", value: string) => {
    const result = loginSchema.safeParse({
      email: field === "email" ? value : email,
      password: field === "password" ? value : password,
    });

    if (!result.success) {
      const fieldError = result.error.issues.find(
        (issue) => issue.path[0] === field
      );
      setErrors((prev) => ({ ...prev, [field]: fieldError?.message }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setErrors({});
      const fieldErrors: { email?: string; password?: string } = {};
      for (const issue of result.error.issues) {
        if (issue.path[0] === "email" || issue.path[0] === "password") {
          fieldErrors[issue.path[0]] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setMessage("Please enter valid information");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login(email, password);
      const user = response?.data?.data?.user;
      const accessToken = response?.data?.data?.accessToken;

      if (response.data.success && response.data) {
        setAuth(user, accessToken);
        setMessage("Login successful!");
        setMessageType("success");
        setTimeout(() => navigate("/fruit"), 1000);
      } else {
        setMessage(response.data.message || "Login failed");
        setMessageType("error");
      }
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorsMsg =
          error.response?.data?.message || "Something went wrong";
        console.log(errorsMsg);
        setMessage(errorsMsg);
        setMessageType("error");
      } else {
        console.log("Unexpected error", error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary-foreground min-h-screen flex flex-col items-center justify-center p-4">
      <MessageBox
        message={message}
        type={messageType}
        onClose={() => setMessage(null)}
      />

      <Card className="w-full max-w-md p-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="login-email"
              >
                Email
              </label>
              <Input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);
                  validateOnChange("email", value);
                }}
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="login-password"
              >
                Password
              </label>
              <Input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  validateOnChange("password", value);
                }}
                required
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full hover:cursor-pointer"
            >
              {loading && <Loader2 className="animate-spin" />}
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-start items-center gap-4 mt-5">
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="hover:underline font-semibold">
              Sign up
            </Link>
          </p>
          <p>
            <Link to="/" className="text-sm hover:underline">
              <Button variant="outline" className="hover:cursor-pointer">
                Go to Homepage
              </Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
