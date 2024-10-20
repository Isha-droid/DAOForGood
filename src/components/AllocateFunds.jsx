import React, { useState, useEffect } from "react";
import {
  getContract,
  getTotalStartFeeBalance,
  getUserAccount,
} from "../utils/web3Client"; 

const FundAllocations = ({contract,account}) => {
  const [projectId, setProjectId] = useState("");
  const [recipient, setRecipient] = useState("");
  const [totalStartFeeBalance, setTotalStartFeeBalance] = useState(0);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const userAddress = getUserAccount(); // Get the user's address

        // Get the contract instance
        const contract = getContract();

        // Fetch the user's project ID
        const userProjectId = await contract.methods
          .getUserProject(userAddress)
          .call();
        setProjectId(Number(userProjectId)); // Set the project ID state

        
        setRecipient(userAddress); 

        const balance = await getTotalStartFeeBalance(); 
        setTotalStartFeeBalance(balance);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []);

  // Function to allocate funds
  const handleAllocateFunds = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const account = await getUserAccount(); // Get the user account here

      // Get the contract instance
      const contract = getContract();

      // Get project details
      const projectDetails = await contract.methods.projects(projectId).call(); 
      const fundingGoal = projectDetails.fundingGoal;

      // Ensure that totalStartFeeBalance is sufficient for the funding goal
      if (Number(totalStartFeeBalance) < Number(fundingGoal)) {
        alert("Insufficient Funding");
        return;
      } else {
        alert("Funds will be transferred soon");
      }

      // Call the allocateFunds function on the smart contract
      await contract.methods
        .allocateFunds(Number(projectId), recipient)
        .send({ from: account });

      setSuccessMessage("Funds allocated successfully!");
      fetchData(); // Refresh the total start fee balance after allocation
    } catch (error) {
    setError("");

      // setError("Error allocating funds: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-black bg-opacity-50 p-6 rounded-xl shadow-2xl max-w-lg w-full mx-4 text-center transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl text-gold mb-4">Allocate Project Funds</h2>
        
        {loading ? ( // Show loading message if data is being fetched
          <p className="text-white">Loading...</p>
        ) : (
          <form onSubmit={handleAllocateFunds} className="space-y-4">
            <div className="relative group">
              <label className="block text-white font-semibold text-sm mb-1 transition duration-300 group-hover:text-gold">
                Project ID:
              </label>
              <input
                type="text"
                value={projectId}
                readOnly
                className="w-full px-3 py-2 bg-transparent text-white border border-gold rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition duration-300"
              />
            </div>
            <div className="relative group">
              <label className="block text-white font-semibold text-sm mb-1 transition duration-300 group-hover:text-gold">
                Recipient Address:
              </label>
              <input
                type="text"
                value={recipient}
                readOnly
                className="w-full px-3 py-2 bg-transparent text-white border border-gold rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition duration-300"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gold text-navy-blue font-semibold rounded-md shadow-md hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Allocate Funds
            </button>
          </form>
        )}

        
        {successMessage && (
          <div className="mt-4 text-green-500 animate-fadeIn">
            {successMessage}
          </div>
        )}
        <div className="mt-6 text-white">
          <h3 className="text-md font-semibold">
            Total Funds Available: {Number(totalStartFeeBalance).toLocaleString()} wei
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FundAllocations;
