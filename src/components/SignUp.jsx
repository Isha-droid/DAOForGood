import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [walletCheckMessage, setWalletCheckMessage] = useState("");
  const [isWalletAvailable, setIsWalletAvailable] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          username,
          email,
          password,
          walletaddress: walletAddress,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign-Up Successful!");
        setErrorMessage("");
        navigate("/login");
      } else {
        setErrorMessage(data.msg || "Sign-up failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const checkWalletAddress = async () => {
    try {
      const response = await fetch("/api/auth/check-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletaddress: walletAddress }),
      });

      const data = await response.json();

      if (response.ok) {
        setWalletCheckMessage(<strong>{data.msg}</strong>);
        setIsWalletAvailable(true);
      } else {
        setWalletCheckMessage(<strong>{data.msg}</strong>);
        setIsWalletAvailable(false);
      }
    } catch (error) {
      setWalletCheckMessage(
        <strong>An error occurred while checking the wallet address.</strong>
      );
      setIsWalletAvailable(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black bg-opacity-70">
      <div className="rounded-lg px-8 py-2 max-w-md w-full h-[80vh] ">
        
        <h2 className="text-4xl text-center font-bold text-white mb-6">DAO for Good</h2>
        <form onSubmit={handleSignup} className="flex flex-col">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Wallet Address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
              required
            />
            <button
              type="button"
              onClick={checkWalletAddress}
              className="bg-indigo-900 text-white px-4 rounded-r-lg"
            >
              Check
            </button>
          </div>
          {walletCheckMessage && (
            <p className="mb-4 text-center text-sm text-gray-700">
              {walletCheckMessage}
            </p>
          )}
          <button
            type="submit"
            className={`py-2 text-white rounded-lg transition-all ${
              isWalletAvailable ? "bg-indigo-900 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isWalletAvailable}
          >
            Sign Up
          </button>
          {errorMessage && (
            <p className="mt-4 text-center text-red-500">{errorMessage}</p>
          )}
        </form>
        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-indigo-900 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
