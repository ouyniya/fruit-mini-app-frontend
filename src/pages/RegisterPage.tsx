// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import MessageBox from "../components/common/MessageBox";
import { authService } from "../services/authService";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { registerSchema } from "../utils/validation";
import axios from "axios";
import { CardFooter } from "../components/ui/card";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const validateOnChange = (
    field: "username" | "email" | "password",
    value: string
  ) => {
    const result = registerSchema.safeParse({
      username: field === "username" ? value : username,
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

    const result = registerSchema.safeParse({ username, email, password });

    if (!result.success) {
      setErrors({});
      const fieldErrors: {
        username?: string;
        email?: string;
        password?: string;
      } = {};
      for (const issue of result.error.issues) {
        if (
          issue.path[0] === "username" ||
          issue.path[0] === "password" ||
          issue.path[0] === "email"
        ) {
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
      const response = await authService.register(username, email, password);

      if (response.data.success) {
        setMessage("Register Success! You can login");
        setMessageType("success");
        setUsername("");
        setEmail("");
        setPassword("");
        // Use navigate for redirection
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(response.data.message || "Register Failed");
        setMessageType("error");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        let errorsMsg = "Something went wrong";
        let errArr = "";
        if (error.response?.data?.message) {
          errorsMsg = error.response?.data?.message;
        }
        if (error.response?.data?.errors?.length > 0) {
          error.response?.data?.errors?.forEach(
            (err: string) => (errArr += `, ${err}`)
          );
        }
        errorsMsg = errorsMsg + errArr;
        console.log(errorsMsg);
        setMessage(errorsMsg);
        setMessageType("error");
      } else {
        console.log("Unexpected error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-foreground flex items-center justify-center p-4">
      <MessageBox
        message={message}
        type={messageType}
        onClose={() => setMessage(null)}
      />
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                const value = e.target.value;
                setUsername(value);
                validateOnChange("username", value);
              }}
              required
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              id="email"
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
              htmlFor="password"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
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
            className="w-full hover:cursor-pointer"
            disabled={loading}
          >
            {loading && (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
            )}
            Register
          </Button>
        </form>

        <CardFooter className="flex flex-col justify-start items-center gap-4 mt-12">
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="hover:underline font-semibold">
              Log in
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
      </div>
    </div>
  );
};

export default RegisterPage;
