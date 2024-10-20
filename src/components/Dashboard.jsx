import React, { useState, useEffect } from "react";
import { getAllFundAllocation, getTotalStartFeeBalance } from "../utils/web3Client";

const Dashboard = ({ contract }) => {
  const [fundAllocations, setFundAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalFunds, setTotalFunds] = useState(0);

  useEffect(() => {
    const fetchFundAllocations = async () => {
      try {
        const allocations = await getAllFundAllocation();
        setFundAllocations(allocations);
        
        // Ensure this is awaited to get the correct total funds value
        const tf = await getTotalStartFeeBalance(); 
        setTotalFunds(tf);
      } catch (error) {
        setError("Error fetching fund allocations: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFundAllocations();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  // Uncomment the error handling if needed
  // if (error) return <div className="error text-red-500">{error}</div>;

  return (
    <div className="dashboard bg-black bg-opacity-70 p-6 rounded-xl shadow-2xl max-w-3xl w-full mx-auto text-center transition-transform duration-500">
      <h2 className="text-4xl font-bold text-white mb-4">Fund Allocations Dashboard</h2>
      
      <div className="text-xl font-semibold text-white mb-4">
        Total Funds Available: {Number(totalFunds).toLocaleString()} wei
      </div>
      
      {fundAllocations.length === 0 ? (
        <p className="text-gray-300">No fund allocations available.</p>
      ) : (
        <div className="overflow-hidden">
          <table className="min-w-full bg-transparent">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border-b text-left">Project ID</th>
                <th className="py-2 px-4 border-b text-left">Project Description</th>
                <th className="py-2 px-4 border-b text-left">Amount (wei)</th>
                <th className="py-2 px-4 border-b text-left">Recipient</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700 text-white">
              {fundAllocations.map((allocation, index) => (
                <tr key={index} className="hover:bg-gray-600 transition-colors duration-200">
                  <td className="py-2 px-4 border-b">{Number(allocation.projectId)}</td>
                  <td className="py-2 px-4 border-b">{allocation.projectDescription}</td>
                  <td className="py-2 px-4 border-b">{Number(allocation.amount).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">{allocation.recipient}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
