import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed
import { FaTachometerAlt, FaMoneyBillWave, FaPlusCircle, FaEye, FaProjectDiagram, FaBalanceScale } from 'react-icons/fa';

const Navigation = ({ contract }) => {
    return (
        <div className="flex items-center justify-center bg-black bg-opacity-70">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-xl shadow-2xl max-w-4xl w-full">

                <Link to="/dashboard" className="flex flex-col items-center">
                    <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg w-full flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <FaTachometerAlt className="text-white text-4xl mb-2" />
                        <h3 className="text-white font-semibold">Dashboard</h3>
                        <p className="text-gray-300 text-sm text-center">
                            Overview of your projects, allocations, and activities.
                        </p>
                        <button className="w-full h-16 border-4 border-white text-white font-semibold rounded-lg transition duration-300 shadow-md mt-2 hover:bg-gray-600">
                            Go to Dashboard
                        </button>
                    </div>
                </Link>

                <Link to="/allocate-funds" className="flex flex-col items-center">
                    <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg w-full flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <FaMoneyBillWave className="text-white text-4xl mb-2" />
                        <h3 className="text-white font-semibold">Allocate Funds</h3>
                        <p className="text-gray-300 text-sm text-center">
                            Manage your funds and allocate them to various projects.
                        </p>
                        <button className="w-full h-16 border-4 border-white text-white font-semibold rounded-lg transition duration-300 shadow-md mt-2 hover:bg-gray-600">
                            Allocate Funds
                        </button>
                    </div>
                </Link>

                <Link to="/create-project" className="flex flex-col items-center">
                    <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg w-full flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <FaPlusCircle className="text-white text-4xl mb-2" />
                        <h3 className="text-white font-semibold">Create Project</h3>
                        <p className="text-gray-300 text-sm text-center">
                            Start new projects and manage your ideas.
                        </p>
                        <button className="w-full h-16 border-4 border-white text-white font-semibold rounded-lg transition duration-300 shadow-md mt-2 hover:bg-gray-600">
                            Create Project
                        </button>
                    </div>
                </Link>

                <Link to="/view-projects" className="flex flex-col items-center">
                    <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg w-full flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <FaEye className="text-white text-4xl mb-2" />
                        <h3 className="text-white font-semibold">View Projects</h3>
                        <p className="text-gray-300 text-sm text-center">
                            Explore all your projects and their details.
                        </p>
                        <button className="w-full h-16 border-4 border-white text-white font-semibold rounded-lg transition duration-300 shadow-md mt-2 hover:bg-gray-600">
                            View Projects
                        </button>
                    </div>
                </Link>

                <Link to="/manage-projects" className="flex flex-col items-center">
                    <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg w-full flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <FaProjectDiagram className="text-white text-4xl mb-2" />
                        <h3 className="text-white font-semibold">Manage Projects</h3>
                        <p className="text-gray-300 text-sm text-center">
                            Control and manage existing projects efficiently.
                        </p>
                        <button className="w-full h-16 border-4 border-white text-white font-semibold rounded-lg transition duration-300 shadow-md mt-2 hover:bg-gray-600">
                            Manage Projects
                        </button>
                    </div>
                </Link>

                <Link to="/reward-penalty" className="flex flex-col items-center">
                    <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg w-full flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <FaBalanceScale className="text-white text-4xl mb-2" />
                        <h3 className="text-white font-semibold">Reward & Penalty</h3>
                        <p className="text-gray-300 text-sm text-center">
                            Manage rewards and penalties for project performance.
                        </p>
                        <button className="w-full h-16 border-4 border-white text-white font-semibold rounded-lg transition duration-300 shadow-md mt-2 hover:bg-gray-600">
                            View Rewards & Penalties
                        </button>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default Navigation;
