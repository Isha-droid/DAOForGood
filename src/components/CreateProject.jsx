import React, { useState } from "react";
import { createProject } from "../utils/web3Client";

const CreateProject = ({ contract }) => {
    const [description, setDescription] = useState("");
    const [fundingGoal, setFundingGoal] = useState("");
    const [duration, setDuration] = useState("");
    const [taskDescriptions, setTaskDescriptions] = useState(["", "", ""]);
    const [error, setError] = useState("");

    const handleTaskChange = (index, value) => {
        const newTasks = [...taskDescriptions];
        newTasks[index] = value;
        setTaskDescriptions(newTasks);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProject(description, fundingGoal, duration, taskDescriptions);
            alert("Project created successfully!");
            setDescription("");
            setFundingGoal("");
            setDuration("");
            setTaskDescriptions(["", "", ""]);
        } catch (err) {
            setError("Error creating project: " + err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-black bg-opacity-50 p-6 rounded-xl shadow-2xl max-w-lg w-full mx-4 text-center transform transition-all duration-500 hover:scale-105">

                <h2 className="text-4xl  text-gold mb-8">
                    Create a New Project
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar"
                >
                    <div className="transition-transform duration-200 hover:-translate-y-1">
                        <label className="block text-white font-semibold mb-2">
                            Project Description:
                        </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-transparent text-white border border-white rounded-lg focus:outline-none focus:ring-4 focus:ring-gold/70 shadow-md transition duration-300"
                        />
                    </div>
                    <div className="transition-transform duration-200 hover:-translate-y-1">
                        <label className="block text-white font-semibold mb-2">
                            Funding Goal (ETH):
                        </label>
                        <input
                            type="number"
                            value={fundingGoal}
                            onChange={(e) => setFundingGoal(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-transparent text-white border border-white rounded-lg focus:outline-none focus:ring-4 focus:ring-gold/70 shadow-md transition duration-300"
                        />
                    </div>
                    <div className="transition-transform duration-200 hover:-translate-y-1">
                        <label className="block text-white font-semibold mb-2">
                            Duration (days):
                        </label>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-transparent text-white border border-white rounded-lg focus:outline-none focus:ring-4 focus:ring-gold/70 shadow-md transition duration-300"
                        />
                    </div>
                    <h3 className="text-lg text-gold font-semibold mb-4">Tasks</h3>
                    {taskDescriptions.map((task, index) => (
                        <div key={index} className="transition-transform duration-200 hover:-translate-y-1">
                            <label className="block text-white font-semibold mb-2">
                                Task {index + 1} Description:
                            </label>
                            <input
                                type="text"
                                value={task}
                                onChange={(e) => handleTaskChange(index, e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-transparent text-white border border-white rounded-lg focus:outline-none focus:ring-4 focus:ring-gold/70 shadow-md transition duration-300"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full py-3 mt-6 bg-gold text-navy-blue font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transform transition-all duration-300 hover:scale-105"
                    >
                        Create Project
                    </button>
                    {error && <p className="mt-6 text-red-500 text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default CreateProject;