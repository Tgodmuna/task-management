import { useState, FormEvent, useContext } from "react";
import { AlertCircle, Loader2, Lock, Mail } from "lucide-react";
import axios from "axios";
import useEnvironmentUrls from "../hooks/UseEnvironmentVar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../App";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { serverUrl } = useEnvironmentUrls();
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      //validate data
      if (!email || !password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }
      const response = await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("authenticated successfully");

        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem("token", response.data.token);

        //navigate to dashboard
        setTimeout(() => navigate("/dashboard", { replace: true }), 1000);

        //toggle login state
        appContext?.toggleLogin(true);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error("login failed. Please try again.");

      setError(error?.response?.data.message || error?.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-100 to-purple-500">
      <div className="w-full max-w-md p-6 shadow-xl bg-white rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-700">Login</h2>

        {error && (
          <div className="flex items-center gap-2 p-2 mb-4 text-red-600 bg-red-100 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg p-3 gap-2">
            <Mail className="text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg p-3 gap-2">
            <Lock className="text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
            {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-semibold hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
