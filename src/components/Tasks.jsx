import React, { useEffect, useState } from 'react';
import { getContract, getUserAccount } from '../utils/web3Client';

const Tasks = ({ contract }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [projectId, setProjectId] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // Fetch project details
                const userAddress = await getUserAccount();
                const userProjectId = await contract.methods.getUserProject(userAddress).call();
                setProjectId(Number(userProjectId));
                const projectDetails = await contract.methods.getAllProjectsWithVotes().call();
                let task = projectDetails[projectId].project;
                console.log(task)
                let t= task.tasks;
                console.log(t)
                setTasks(t);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        if (contract) {
            fetchTasks();
        }
    }, );

    const handleCompleteTask = async (taskIndex) => {
        try {
            // Mark the task as completed
            await contract.methods.completeTask(0, taskIndex).send({ from: await getUserAccount() });
            // Update the task state
            setTasks((prevTasks) => {
                const newTasks = [...prevTasks];
                newTasks[taskIndex].isCompleted = true;
                return newTasks;
            });
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const handleCheckCompletion = async () => {
        const allCompleted = tasks.every(task => task.isCompleted);
        if (allCompleted) {
            const userChoice = window.confirm('All tasks are completed. Would you like to close the project?');
            if (userChoice) {
                await cancelProject();
            } else {
                const newTaskDescription = prompt('Enter a new task description:');
                if (newTaskDescription) {
                    await addTask(newTaskDescription);
                }
            }
        }
    };

    const cancelProject = async () => {
        try {
            await contract.methods.finalizeProject(projectId).send({ from: await getUserAccount() });
            setMessage('Project has been canceled.');
        } catch (error) {
            console.error('Error canceling project:', error);
        }
    };

    const addTask = async (description) => {
        try {
            await contract.methods.addTask(projectId, description).send({ from: await getUserAccount() });
            setTasks(prevTasks => [...prevTasks, { description, isCompleted: false }]);
            setMessage('New task added successfully.');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    useEffect(() => {
        if (tasks.length > 0) {
            handleCheckCompletion();
        }
    }, [tasks]);

    if (loading) {
        return <div className="loading-text">Loading tasks...</div>;
    }

    return (
        <div className="tasks-container bg-black bg-opacity-60 text-white p-6 rounded-lg shadow-lg">
            <h1 className="tasks-title text-2xl font-bold mb-4">Tasks for Project ID: {projectId}</h1>
            {message && <p className="message-text text-yellow-400 mb-4">{message}</p>}
            <ul className="tasks-list space-y-4">
                {tasks.map((task, index) => (
                    <li key={index} className="task-item flex justify-between items-center bg-gray-700 p-4 rounded-md">
                        <p className={`task-description text-lg ${task.isCompleted ? 'line-through text-gray-400' : 'text-white'}`}>
                            {task.description} - {task.isCompleted ? 'Completed' : 'Not Completed'}
                        </p>
                        {!task.isCompleted && (
                            <button 
                                onClick={() => handleCompleteTask(index)} 
                                className="complete-button bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                            >
                                Mark as Completed
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
