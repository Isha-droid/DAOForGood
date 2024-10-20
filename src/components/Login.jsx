import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const title = "DAO For Good";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Invalid credentials");
      }

      const data = await response.json();
      setSuccessMessage("Login Successful!");
      setErrorMessage("");
      console.log(data.token);

      navigate("/instructions");
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-50 bg-black bg-opacity-70">
      <div className="rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <img src="/icon.png" alt="DAO Icon" className="w-16 h-16 rounded-full" />
        </div>
        <h2 className="text-4xl text-center font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {title}
        </h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
          <button
            type="submit"
            className="py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-700 transition-all"
          >
            Login
          </button>
          {errorMessage && (
            <p className="mt-4 text-center text-red-500">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="mt-4 text-center text-green-500">{successMessage}</p>
          )}
        </form>
        <p className="mt-6 text-center text-white text-sm">
          Don't have an account?{" "}
          <span
            className="text-indigo-900 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
